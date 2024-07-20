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

        if (!$user) {
            // Crear el usuario "Christian Mora"
            $user = User::create([
                'name' => 'Christian Mora',
                'email' => 'christianmoralopez@hotmail.com',
                'password' => bcrypt('password'), // Cambia 'password' por la contraseña real si es necesario
            ]);
        }

        // Asignar el rol 'admin' al usuario
        $role = Role::where('name', 'admin')->first(); // Corregido: buscar el rol por 'name'
        if ($role && !$user->hasRole('admin')) {
            $user->assignRole($role);
        }
    }
}
