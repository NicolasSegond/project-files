<?php

namespace App\ApiPlatform\OpenApi\Factory;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\Model\MediaType;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\PathItem;
use ApiPlatform\OpenApi\Model\RequestBody;
use ApiPlatform\OpenApi\OpenApi;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\HttpFoundation\Response;

#[AsDecorator(decorates: 'api_platform.openapi.factory')]
class RefreshTokenPathFactoryDecorator implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);

        $openApi
            ->getPaths()
            ->addPath('/api/token/refresh', (new PathItem())->withPost(
                (new Operation())
                    ->withOperationId('login_refresh_post')
                    ->withTags(['Authorization'])
                    ->withResponses([
                        Response::HTTP_OK => [
                            'description' => 'UserAPI tokens created.',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'token' => [
                                                'readOnly' => true,
                                                'type' => 'string',
                                                'nullable' => false,
                                            ],
                                            'refresh_token' => [
                                                'readOnly' => true,
                                                'type' => 'string',
                                                'nullable' => false,
                                            ],
                                        ],
                                        'required' => ['token', 'refresh_token'],
                                    ],
                                ],
                            ],
                        ],
                    ])
                    ->withSummary('Refreshes a user token.')
                    ->withDescription('Refreshes a user token.')
                    ->withRequestBody(
                        (new RequestBody())
                            ->withDescription('The refresh data')
                            ->withContent(new \ArrayObject([
                                'application/json' => new MediaType(
                                    new \ArrayObject(
                                        new \ArrayObject([
                                            'type' => 'object',
                                            'properties' => $properties = array_merge_recursive(
                                                $this->getJsonSchemaFromPathParts(explode('.', 'refresh_token'))
                                            ),
                                            'required' => array_keys($properties),
                                        ])
                                    )
                                ),
                            ]))
                            ->withRequired(true)
                    )
            ));

        return $openApi;
    }

    private function getJsonSchemaFromPathParts(array $pathParts): array
    {
        $jsonSchema = [];

        if (count($pathParts) === 1) {
            $jsonSchema[array_shift($pathParts)] = [
                'type' => 'string',
                'nullable' => false,
            ];

            return $jsonSchema;
        }

        $pathPart = array_shift($pathParts);
        $properties = $this->getJsonSchemaFromPathParts($pathParts);
        $jsonSchema[$pathPart] = [
            'type' => 'object',
            'properties' => $properties,
            'required' => array_keys($properties),
        ];

        return $jsonSchema;
    }
}