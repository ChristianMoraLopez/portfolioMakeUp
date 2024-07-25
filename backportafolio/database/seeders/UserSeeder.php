<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Verificar si el usuario "Christian Mora" ya existe
        $user = User::firstOrCreate(
            ['email' => 'christianmoralopez@hotmail.com'],
            [
                'name' => 'Christian Mora',
                'password' => bcrypt('password'), // Cambia 'password' por la contraseña real si es necesario
            ]
        );

        // Verificar si el usuario "Nico Gomez" ya existe
        $user2 = User::firstOrCreate(
            ['email' => 'nico.gomezita@gmail.com'],
            [
                'name' => 'Nico Gomez',
                'password' => bcrypt('46824682'), // Cambia 'password' por la contraseña real si es necesario
            ]
        );

        // Asignar el rol 'admin' al usuario "Christian Mora"
        $role = Role::where('name', 'admin')->first();
        $roleUser = Role::where('name', 'user')->first();

        if ($role) {
            if (!$user->hasRole('admin')) {
                $user->assignRole($role);
            }
            if (!$user2->hasRole('user')) {
                $user2->assignRole($roleUser);
            }
        }
    }
}
