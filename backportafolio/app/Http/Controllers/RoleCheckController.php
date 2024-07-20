<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RoleCheckController extends Controller
{
    public function checkRole(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        $roles = $user->getRoleNames();

        if ($roles->isEmpty()) {
            return response()->json(['role' => 'user']);
        } else {
            // Aquí puedes decidir cómo quieres devolver el rol (el primer rol en este caso)
            return response()->json(['role' => $roles->first()]);
        }
    }
}
