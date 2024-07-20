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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|string',
        ]);

        $service = Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url,
        ]);

        return response()->json($service, 201);
    }

    // Actualizar un servicio existente
    public function update(Request $request, Service $service)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|string',
        ]);

        $service->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url,
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
