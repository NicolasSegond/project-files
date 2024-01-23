<?php

namespace App\Mapper;

use App\ApiResource\FilesAPI;
use App\ApiResource\UserAPI;
use App\Entity\Files;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

#[AsMapper(from: UserAPI::class, to: User::class)]
class UserApiToEntityMapper implements MapperInterface
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
    )
    {

    }

    public function load(object $from, string $toClass, array $context): object
    {
        $dto = $from;
        assert($dto instanceof UserAPI);

        $userEntity = $dto->id ? $this->userRepository->find($dto->id) : new User();
        if(!$userEntity){
            throw new \Exception('User not found');
        }

        return $userEntity;
    }

    public function populate(object $from, object $to, array $context): object
    {
        $dto = $from;
        assert($dto instanceof UserAPI);

        $entity = $to;
        assert($entity instanceof User);

        $entity->setEmail($dto->email);
        if($dto->password){
            $entity->setPassword($this->passwordHasher->hashPassword($entity, $dto->password));
        }

        $entity->setRoles($dto->roles);

        return $entity;
    }
}