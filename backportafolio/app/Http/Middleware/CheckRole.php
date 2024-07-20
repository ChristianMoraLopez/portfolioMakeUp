<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();

        if (!$user || !$user->hasRole($role)) {
            // Puedes devolver un mensaje de error o redirigir a una página de acceso denegado
            return response()->json(['error' => 'No tienes permisos para acceder a esta ruta.'], 403);
        }

        return $next($request);
    }
}
