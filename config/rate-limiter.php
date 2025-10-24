<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Rate Limiter
    |--------------------------------------------------------------------------
    |
    | By default, Laravel will throttle API requests at 60 requests per minute.
    | You may change this value as needed based on your application's
    | requirements and the capacity of your server.
    |
    */

    'limit' => env('RATE_LIMIT', '60,1'),

    /*
    |--------------------------------------------------------------------------
    | Rate Limiter Store
    |--------------------------------------------------------------------------
    |
    | This option controls the cache store that will be used by the rate
    | limiter. You may change this to any of the stores defined in the
    | cache configuration file.
    |
    */

    'store' => env('RATE_LIMIT_STORE', 'cache'),

];
