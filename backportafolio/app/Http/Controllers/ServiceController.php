<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Obtener todos los servicios
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }

    // Crear un nuevo servicio
    public function store(Request $request)
    {
        \Log::info('Received service creation request', $request->all());

        // Validar los datos recibidos
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        try {
            // Revisar si el servicio ya existe antes de crear uno nuevo
            $existingService = Service::where('name', $request->name)
                                      ->where('user_id', $request->user_id)
                                      ->first();

            if ($existingService) {
                \Log::info('Service already exists', $existingService->toArray());
                return response()->json(['error' => 'Service already exists'], 409);
            }

            // Crear el servicio con los datos recibidos
            $service = Service::create([
                'user_id' => $request->user_id,
                'name' => $request->name,
                'description' => $request->description,
                'image_url' => $request->image_url,
                'price' => $request->price,
                'available' => $request->has('available') ? $request->available : true,
            ]);

            return response()->json($service, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating service: '.$e->getMessage());
            return response()->json(['error' => 'Failed to create service'], 500);
        }
    }

    // Actualizar un servicio existente
    public function update(Request $request, Service $service)
    {
        // Validar los datos recibidos
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|url',
            'available' => 'nullable|boolean',
        ]);

        // Actualizar el servicio con los datos proporcionados
        $service->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url,
            'available' => $request->has('available') ? $request->available : $service->available,
        ]);

        return response()->json($service);
    }

    // Eliminar un servicio
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(null, 204);
    }
}
