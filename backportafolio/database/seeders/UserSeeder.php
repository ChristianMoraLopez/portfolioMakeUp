<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Verificar si el usuario ya existe
        $user = User::where('email', 'christianmoralopez@hotmail.com')->first();
        $user2 = User::where('email', 'nico.gomezita@gmail.com')->first();


        if (!$user) {
            // Crear el usuario "Christian Mora"
            $user = User::create([
                'name' => 'Christian Mora',
                'email' => 'christianmoralopez@hotmail.com',
                'password' => bcrypt('password'), // Cambia 'password' por la contraseña real si es necesario
            ]);

        }
        if (!$user2) {
            // Crear el usuario "Nico Gomez"
            $user2 = User::create([
                'name' => 'Nico Gomez',
                'email' => 'nico.gomezita@gmail.com',
            'password' => bcrypt('46824682'), // Cambia 'password' por la contraseña real si es necesario
        ]);

    }

        // Asignar el rol 'admin' al usuario
        $role = Role::where('name', 'admin')->first(); // Corregido: buscar el rol por 'name'
        if ($role && !$user->hasRole('admin')) {
            $user->assignRole($role);
        }
    }
}
