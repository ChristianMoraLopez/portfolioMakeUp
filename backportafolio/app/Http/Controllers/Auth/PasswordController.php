<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Redirect;
use Symfony\Component\HttpFoundation\Response;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): Response
    {
        $validated = $request->validateWithBag('updatePassword', [
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        // enviar mensaje de confirmación
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Password updated successfully',
                'redirect' => '/'  // URL relativa
            ]);
        }

        return Redirect::to('/')->with('status', 'password-updated');
    }
}
