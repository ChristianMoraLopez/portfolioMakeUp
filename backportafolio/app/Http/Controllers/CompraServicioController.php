<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompraServicioController extends Controller
{
    public function comprarServicio(Request $request, Service $servicio)
    {
        $user = Auth::user();

        // Agregar el servicio comprado al usuario
        $user->serviciosComprados()->attach($servicio);

        return redirect()->route('dashboard')->with('success', '¡Servicio comprado exitosamente!');
    }

    public function misCompras()
    {
        $user = Auth::user();

        // Obtener todos los servicios comprados por el usuario
        $serviciosComprados = $user->serviciosComprados()->get();

        return view('servicios.mis-compras', compact('serviciosComprados'));
    }
}
