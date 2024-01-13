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

#[AsDecorator(decorates: 'api_platform.openapi.factory', priority: -10000)]
class LoginPathFactoryDecorator implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);

        $openApi
            ->getPaths()
            ->addPath('/api/login', (new PathItem())->withPost(
                (new Operation())
                    ->withOperationId('login_post')
                    ->withTags(['Authorization'])
                    ->withResponses([
                        Response::HTTP_OK => [
                            'description' => 'User logged in successfully.',
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
                        // You can add more response codes as needed.
                    ])
                    ->withSummary('Get JWT token to login')
                    ->withDescription('Get JWT token to login, and refresh_token to refresh session.')
                    ->withRequestBody(
                        (new RequestBody())
                            ->withDescription('The login data')
                            ->withContent(new \ArrayObject([
                                'application/json' => new MediaType(
                                    new \ArrayObject(
                                        new \ArrayObject([
                                            'type' => 'object',
                                            'properties' => [
                                                'email' => [
                                                    'type' => 'string',
                                                    'example' => 'johndoe@example.fr',
                                                    'nullable' => false,
                                                ],
                                                'password' => [
                                                    'type' => 'string',
                                                    'example' => 'test1234*',
                                                    'nullable' => false,
                                                ],
                                            ],
                                            'required' => ['username', 'password'],
                                        ])
                                    )
                                ),
                            ]))
                            ->withRequired(true)
                    )
            ));

        return $openApi;
    }
}
