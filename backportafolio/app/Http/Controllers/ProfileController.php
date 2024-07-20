<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */

     public function update(ProfileUpdateRequest $request): Response
     {
         $request->user()->fill($request->validated());

         if ($request->user()->isDirty('email')) {
             $request->user()->email_verified_at = null;
         }

         $request->user()->save();

         if ($request->wantsJson()) {
             return response()->json([
                 'message' => 'Profile updated successfully',
                 'redirect' => '/profile'  // URL relativa
             ]);
         }

         return Redirect::to('/profile')->with('status', 'profile-updated');
     }
    /**
     * Delete the user's account.
     */

     public function destroy(Request $request): JsonResponse
{
    $request->validate([
        'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();
    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Account deleted successfully']);
}

}
