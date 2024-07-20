<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ejemplo de datos de servicios
        $services = [
            [
                'user_id' => 1,
                'nombre' => 'Servicio 1',
                'descripcion' => 'Descripción del servicio 1',
                'image_url' => 'https://via.placeholder.com/250',
                'price' => 100.00,
                'disponible' => true,
            ],
            [
                'user_id' => 1,
                'nombre' => 'Servicio 2',
                'descripcion' => 'Descripción del servicio 2',
                'image_url' => 'https://via.placeholder.com/250',
                'price' => 150.00,
                'disponible' => true,
            ],
            // Agrega más servicios según sea necesario
        ];

        // Insertar los servicios en la base de datos
        foreach ($services as $serviceData) {
            Service::create($serviceData);
        }
    }
}
