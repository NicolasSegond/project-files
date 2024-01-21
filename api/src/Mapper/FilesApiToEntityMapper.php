<?php

namespace App\Mapper;

use App\ApiResource\FilesAPI;
use App\ApiResource\UserAPI;
use App\Entity\Files;
use App\Entity\User;
use App\Repository\FilesRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

#[AsMapper(from: FilesAPI::class, to: Files::class)]
class FilesApiToEntityMapper implements MapperInterface
{
    public function __construct(
        private FilesRepository $filesRepository,
        private Security $security,
        private MicroMapperInterface $microMapper,
    )
    {

    }

    public function load(object $from, string $toClass, array $context): object
    {
        $dto = $from;
        assert($dto instanceof FilesAPI);

        $fileEntity = $dto->id ? $this->filesRepository->find($dto->id) : new Files();
        if(!$fileEntity){
            throw new \Exception('Files not found');
        }

        return $fileEntity;
    }

    public function populate(object $from, object $to, array $context): object
    {
        $dto = $from;
        assert($dto instanceof FilesAPI);

        $entity = $to;
        assert($entity instanceof Files);

        $entity->setName($dto->name);
        $entity->setDescription($dto->description);
        if ($dto->owner) {
            $entity->setOwner($this->microMapper->map($dto->owner, User::class, [
                MicroMapperInterface::MAX_DEPTH => 0,
            ]));
        } else {
            $entity->setOwner($this->security->getUser());
        }
        $entity->setDateCreation($dto->date_creation);
        $entity->setPoids($dto->poids);
        $entity->setChemin($dto->chemin);
        $entity->setStatut($dto->statut);
        $entity->setSharedWith($dto->shared_with);

        return $entity;
    }
}