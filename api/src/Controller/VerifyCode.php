<?php

// src/Controller/Api/UserController.php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class VerifyCode extends AbstractController
{
    private $entityManager; // Ajout de cette ligne

    public function __construct(EntityManagerInterface $entityManager) // Ajout de cette méthode
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/users/check-code', methods: ['POST'])]
    public function checkCode(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $userId = $data['userId']; // Supposons que le client envoie également l'ID de l'utilisateur
        $userProvidedCode = $data['code'];

        // Recherchez l'utilisateur en base de données par son ID
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($userId);

        // Vérifiez si l'utilisateur existe et si le code correspond
        if ($user && $user->getCode() === $userProvidedCode) {
            return $this->json(['isCodeEqual' => true]);
        } else {
            return $this->json(['isCodeEqual' => false]);
        }
    }
}