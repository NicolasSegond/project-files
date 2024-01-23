<?php

namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use App\Entity\User;

#[ApiResource(
    shortName: 'User',
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Post(security: "is_granted('PUBLIC_ACCESS')"),

    ],
    paginationItemsPerPage: 5,
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    stateOptions: new Options(entityClass: User::class),
)]
#[ApiResource(
    shortName: 'User',
    operations: [
        new Post(
            uriTemplate: '/users/check-code',
            controller: "App\Controller\VerifyCode::checkCode",
            openapiContext: [
                'summary' => 'Check if the code provided by the user matches the one stored in the database',
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'userId' => [
                                        'type' => 'integer',
                                        'example' => 1,
                                    ],
                                    'code' => [
                                        'type' => 'string',
                                        'example' => '123456',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'responses' => [
                    '200' => [
                        'description' => 'The code provided by the user matches the one stored in the database',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'isCodeEqual' => [
                                            'type' => 'boolean',
                                            'example' => true,
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    '400' => [
                        'description' => 'The code provided by the user does not match the one stored in the database',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'isCodeEqual' => [
                                            'type' => 'boolean',
                                            'example' => false,
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            security: "is_granted('PUBLIC_ACCESS')"
        )
    ]
)]

class UserAPI
{
    #[ApiProperty(readable: false, writable: false, identifier: true)]
    public ?int $id = null;

    #[ApiProperty(readable: true)]
    public ?string $email = null;

    #[ApiProperty(readable: false)]
    public ?string $password = null;

    #[ApiProperty(readable: true, writable: false)]
    public array $files = [];

    public ?array $roles = [];

    public ?string $code = null;
}