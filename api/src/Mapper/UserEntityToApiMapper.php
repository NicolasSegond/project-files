<?php

namespace App\Mapper;

use App\ApiResource\FilesAPI;
use App\ApiResource\UserAPI;
use App\Entity\Files;
use App\Entity\User;
use Doctrine\Common\Collections\Collection;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

#[AsMapper(from: User::class, to: UserAPI::class)]
class UserEntityToApiMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper,
    )
    {
    }

    public function load(object $from, string $toClass, array $context): object
    {
        $entity = $from;
        assert($entity instanceof User);

        $dto = new UserAPI();
        $dto->id = $entity->getId();

        return $dto;
    }

    public function populate(object $from, object $to, array $context): object
    {
        $entity = $from;
        assert($entity instanceof User);

        $dto = $to;
        assert($dto instanceof UserAPI);

        $dto->id = $entity->getId();
        $dto->email = $entity->getEmail();
        $dto->password = $entity->getPassword();

        $dto->files = array_map(function (Files $file) {
            return $this->microMapper->map($file, FilesAPI::class, [
                MicroMapperInterface::MAX_DEPTH => 1,
            ]);
        }, $entity->getFiles()->getValues());

        $dto->roles = $entity->getRoles();
        return $dto;
    }
}