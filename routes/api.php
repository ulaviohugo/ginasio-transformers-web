<?php

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use App\Http\Controllers\AthleteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\GraphController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MensalidadeController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TuitionFeeController;
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

	Route::get('athletes/count', [AthleteController::class, 'count']);
	Route::apiResource('athletes', AthleteController::class);


	Route::prefix('cash-register')->group(function () {
		Route::get('', [CashRegisterController::class, 'show']);
		Route::post('', [CashRegisterController::class, 'store']);
	});


	Route::get('employees/count', [UserController::class, 'count']);
	Route::apiResource('employees', UserController::class);

	Route::get('locations', [LocationController::class, 'index']);

	Route::apiResource('transactions', TransactionController::class);

	Route::apiResource('tuition-fees', TuitionFeeController::class);

	Route::prefix('graphs')->group(function () {
		Route::post('cash-register', [GraphController::class, 'cashRegister']);
	});
});

Route::get('materiais', [EquipmentController::class, 'index']);
Route::post('materiais', [EquipmentController::class, 'store']);
Route::get('materiais/{equipment}', [EquipmentController::class, 'show']);
Route::put('materiais/{equipment}', [EquipmentController::class, 'update']);
Route::delete('materiais/{equipment}', [EquipmentController::class, 'destroy']);

Route::get('mensalidade', [MensalidadeController::class, 'index']);
Route::post('mensalidade', [MensalidadeController::class, 'store']);
Route::get('mensalidade/{mensalidade}', [MensalidadeController::class, 'show']);
Route::put('mensalidade/{mensalidade}', [MensalidadeController::class, 'update']);
Route::delete('mensalidade/{mensalidade}', [MensalidadeController::class, 'destroy']);

Route::any('/{path}', function () {
	$url = url()->full();
	$method = request()->method();
	return HttpResponse::error(message: "A rota {$url} com o método {$method} não foi encontrada", status: HttpStatusCode::NOT_FOUND);
})->where('path', '([A-z\d\-\/_.]+)?');
