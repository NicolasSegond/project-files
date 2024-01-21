<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Zenstruck\Browser\Test\HasBrowser;
use Zenstruck\Foundry\Test\ResetDatabase;

class loginTest extends KernelTestCase
{
    use HasBrowser;
    use ResetDatabase;

    public function testLoginDoesntExistReturn401(): void
    {
        $this->browser()
            ->post('/api/login', [
                'json' => [
                    'email' => 'Unknown',
                    'password' => 'pass',
                ],
            ])
            ->assertStatus(401);
    }

    public function testLoginWrongPasswordReturn401(): void
    {
        $this->browser()
            ->post('/api/login', [
                'json' => [
                    'email' => "nicolassegond0@gmail.com",
                    'password' => 'pass',
                ],
            ])
            ->assertStatus(401);
    }
}