<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('api_token')->get(
    '/user',
    function () {
        return auth()->user();
    }
);
Route::middleware('api_token')->get(
    'get_students',
    [StudentsController::class, 'get_student']
);
Route::middleware('api_token')->post(
    'post_student',
    [StudentsController::class, 'post_student']
);