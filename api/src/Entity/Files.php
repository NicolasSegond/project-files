<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\FilesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Ignore;

#[ApiResource(
    uriTemplate: '/files/{user_id}/files.{_format}',
    shortName: 'Treasure',
    operations: [new GetCollection()],
    uriVariables: [
        'user_id' => new Link(
            fromProperty: 'files',
            fromClass: User::class,
        ),
    ],
    security: "is_granted('ROLE_USER')"
)]
#[ORM\Entity(repositoryClass: FilesRepository::class)]

#[ApiResource(
    shortName: 'File',
    operations: [
        new Get(security: "is_granted('ROLE_USER')"),
        new Post(security: "is_granted('ROLE_USER')"),
        new GetCollection(),
        new Patch(security: "is_granted('ROLE_USER')"),
        new Delete(security: "is_granted('ROLE_USER')")
    ],
)]
class Files
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'files')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiFilter(SearchFilter::class, strategy: 'exact')]
    private ?User $owner = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $date_creation = null;

    #[ORM\Column]
    private ?int $poids = null;

    #[ORM\Column(length: 255)]
    private ?string $chemin = null;

    #[ORM\Column(length: 255)]
    #[ApiFilter(SearchFilter::class, strategy: 'exact')]
    private ?string $statut = null;

    #[ORM\Column]
    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    private array $shared_with = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->date_creation;
    }

    #[Ignore]
    public function setDateCreation(\DateTimeInterface $date_creation): static
    {
        $this->date_creation = $date_creation;

        return $this;
    }

    public function getPoids(): ?int
    {
        return $this->poids;
    }

    public function setPoids(int $poids): static
    {
        $this->poids = $poids;

        return $this;
    }

    public function getChemin(): ?string
    {
        return $this->chemin;
    }

    public function setChemin(string $chemin): static
    {
        $this->chemin = $chemin;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    #[Ignore]
    public function getSharedWith(): array
    {
        return $this->shared_with;
    }

    public function setSharedWith(array $shared_with): static
    {
        $this->shared_with = $shared_with;

        return $this;
    }
}
