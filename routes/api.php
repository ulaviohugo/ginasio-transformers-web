<?php

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use App\Http\Controllers\AthleteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\GraphController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
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

	Route::apiResource('athletes', AthleteController::class);


	Route::prefix('cash-register')->group(function () {
		Route::get('', [CashRegisterController::class, 'show']);
		Route::post('', [CashRegisterController::class, 'store']);
	});


	Route::get('employees/count', [UserController::class, 'count']);
	Route::apiResource('employees', UserController::class);

	Route::get('locations', [LocationController::class, 'index']);

	Route::apiResource('transactions', TransactionController::class);

	Route::prefix('graphs')->group(function () {
		Route::post('production-stock', [GraphController::class, 'productionStock']);
		Route::post('production-sale', [GraphController::class, 'productionSale']);

		Route::post('stock', [GraphController::class, 'stock']);
		Route::post('sale', [GraphController::class, 'sale']);
		Route::post('cash-register', [GraphController::class, 'cashRegister']);
	});
});

Route::any('/{path}', function () {
	$url = url()->full();
	$method = request()->method();
	return HttpResponse::error(message: "A rota {$url} com o método {$method} não foi encontrada", status: HttpStatusCode::NOT_FOUND);
})->where('path', '([A-z\d\-\/_.]+)?');
