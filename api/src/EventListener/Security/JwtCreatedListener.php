<?php

namespace App\EventListener\Security;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\RequestStack;

#[AsEventListener(
    event: 'lexik_jwt_authentication.on_jwt_created',
    method: 'onJWTCreated',
)]
class JwtCreatedListener
{

    public function __construct(
        private RequestStack $requestStack,
    )
    {
    }

    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        assert($user instanceof User);

        $request = $this->requestStack->getCurrentRequest();

        $payload = $event->getData();

        // adding ip, user_id and language to the token
        // we might add permission later
        $payload['ip'] = $request->getClientIp();
        $infoUser = [];

        $infoUser['id'] = "/api/users/".$user->getId();
        $infoUser['email'] = $user->getEmail();
        $infoUser['roles'] = $user->getRoles();

        $payload['user'] = $infoUser;


        $event->setData($payload);
    }
}