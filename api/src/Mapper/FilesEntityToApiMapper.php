<?php

namespace App\Mapper;

use App\ApiResource\FilesAPI;
use App\ApiResource\UserAPI;
use App\Entity\Files;
use App\Entity\User;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

#[AsMapper(from: Files::class, to: FilesAPI::class)]
class FilesEntityToApiMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper,
    )
    {
    }

    public function load(object $from, string $toClass, array $context): object
    {
        $entity = $from;
        assert($entity instanceof Files);

        $dto = new FilesAPI();
        $dto->id = $entity->getId();

        return $dto;
    }

    public function populate(object $from, object $to, array $context): object
    {
        $entity = $from;
        assert($entity instanceof Files);

        $dto = $to;
        assert($dto instanceof FilesAPI);

        $dto->id = $entity->getId();
        $dto->name = $entity->getName();
        $dto->description = $entity->getDescription();
        $dto->owner = $this->microMapper->map($entity->getOwner(), UserAPI::class, [
            MicroMapperInterface::MAX_DEPTH => 0,
        ]);
        $dto->date_creation = $entity->getDateCreation();
        $dto->poids = $entity->getPoids();
        $dto->chemin = $entity->getChemin();
        $dto->statut = $entity->getStatut();
        $dto->shared_with = $entity->getSharedWith();
        return $dto;
    }
}