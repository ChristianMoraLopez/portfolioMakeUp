<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\RoleCheckController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\PaymentController;

// Apply web middleware to all routes
Route::middleware(['web'])->group(function () {
    // Rutas para usuarios no autenticados
    Route::middleware('guest')->group(function () {
        Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
        Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');
        Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
        Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.store');
    });

    // Rutas para usuarios autenticados
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', function () {
            return view('dashboard');
        })->name('dashboard');

        // Rutas para roles específicos
        Route::middleware(CheckRole::class.':admin')->group(function () {
            Route::post('/services', [ServiceController::class, 'store']);
            Route::put('/services/{service}', [ServiceController::class, 'update']);
            Route::delete('/services/{service}', [ServiceController::class, 'destroy']);
        });

        // Rutas de verificación de email
        Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

        Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
            ->middleware(['throttle:6,1'])
            ->name('verification.send');

        // Rutas de cambio de contraseña y perfil
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('/logout', [ProfileController::class, 'logout'])->name('profile.logout');
        Route::delete('/delete-account', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::patch('/password', [PasswordController::class, 'update'])->name('password.update');

        // Rutas de logout
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


    });

    // Otras rutas públicas no autenticadas
    Route::get('/check-role', [RoleCheckController::class, 'checkRole']);
    Route::get('/services', [ServiceController::class, 'index']);
    // Route for getting CSRF token
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

});

// Route for getting CSRF token
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});
