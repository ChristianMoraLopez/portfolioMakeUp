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

    'paths' => ['*',

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

], // Esto cubre todas las rutas, incluyendo las que has listado específicamente

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://192.168.20.22:3000',
        'https://portfolio-make-up-git-main-christianmoralopezs-projects.vercel.app',
        'https://portfolio-make-4foqlc14q-christianmoralopezs-projects.vercel.app',
        'https://portfolio-make-up.vercel.app',
        env('FRONTEND_URL', ''), // Añade esta línea para usar la URL del frontend desde las variables de entorno
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
