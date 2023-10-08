<?php

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeePresenceController;
use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth-jwt')->group(function () {
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::get('/me', [AuthController::class, 'me']);
	Route::post('/refresh-token', [AuthController::class, 'refresh']);

	Route::get('categories/count', [CategoryController::class, 'count']);
	Route::apiResource('categories', CategoryController::class);

	Route::prefix('cash-register')->group(function () {
		Route::get('', [CashRegisterController::class, 'show']);
		Route::post('', [CashRegisterController::class, 'store']);
	});

	Route::apiResource('customers', CustomerController::class);

	Route::apiResource('employee-presences', EmployeePresenceController::class);

	Route::get('locations', [LocationController::class, 'index']);
});


Route::any('/{path}', function () {
	$url = url()->full();
	$method = request()->method();
	return HttpResponse::error(message: "A rota {$url} com o método {$method} não foi encontrada", status: HttpStatusCode::NOT_FOUND);
})->where('path', '([A-z\d\-\/_.]+)?');
