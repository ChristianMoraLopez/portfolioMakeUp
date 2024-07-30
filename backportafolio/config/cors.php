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
        '*', // Esto cubre todas las rutas
        'api/*',
        'login',
        'logout',
        'register',
        'forgot-password',
        'reset-password',
        'email/verification-notification',
        'verify-email/*',
        'dashboard',
        'services',
        'services/*',
        'profile',
        'password',
        'delete-account',
        'logout',
        'payment',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000', // Asegúrate de incluir el esquema (http)
        'https://portfolio-make-up-git-main-christianmoralopezs-projects.vercel.app',
        'https://portfolio-make-4foqlc14q-christianmoralopezs-projects.vercel.app',
        'https://portfolio-make-up.vercel.app',
        'https://www.valentinagomez.store',
        env('FRONTEND_URL', ''), // Usa la URL del frontend desde las variables de entorno
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
