<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

'paths' => [
    '*',
    'api/*',
    'sanctum/csrf-cookie',
    'check-role',
    'services',
    'generate-signature',
    'payment/confirmation',
    'mis-compras',
    'dashboard',
    'makePurchase',
    'cart',
    'register',             // Path común para registro
    'login',                // Path común para inicio de sesión
    'forgot-password',      // Path común para recuperación de contraseña
    'reset-password',       // Path común para restablecimiento de contraseña
    'email/verification-notification', // Path para reenvío de verificación de email
    'profile',              // Path para actualización del perfil
    'password',             // Path para actualización de la contraseña
    'delete-account'        // Path para eliminación de la cuenta
],

'allowed_methods' => [
    '*',
],

'allowed_origins' => [
    env('FRONTEND_URL', 'http://localhost:3000'),
],

'allowed_origins_patterns' => [],

'allowed_headers' => [
    '*',
],

'exposed_headers' => [],

'max_age' => 0,

'supports_credentials' => true,


];
