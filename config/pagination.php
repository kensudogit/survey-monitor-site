<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Pagination View
    |--------------------------------------------------------------------------
    |
    | This view is used to render the pagination link output. You are free
    | to customize this view however you like. However, you may easily
    | customize it here instead of creating your own view to do so.
    |
    */

    'view' => 'pagination::bootstrap-4',

    /*
    |--------------------------------------------------------------------------
    | Pagination View Presenter
    |--------------------------------------------------------------------------
    |
    | This view presenter is used to render the pagination links. You are free
    | to customize this view presenter however you like. However, you may
    | easily customize it here instead of creating your own view to do so.
    |
    */

    'presenter' => Illuminate\Pagination\BootstrapFourPresenter::class,

];
