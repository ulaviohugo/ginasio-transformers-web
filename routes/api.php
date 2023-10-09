<?php

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeePresenceController;
use App\Http\Controllers\InsuredController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSaleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
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

	Route::get('categories/count', [CategoryController::class, 'count']);
	Route::apiResource('categories', CategoryController::class);

	Route::prefix('cash-register')->group(function () {
		Route::get('', [CashRegisterController::class, 'show']);
		Route::post('', [CashRegisterController::class, 'store']);
	});

	Route::get('customers/count', [CustomerController::class, 'count']);
	Route::apiResource('customers', CustomerController::class);

	Route::get('employees/count', [UserController::class, 'count']);
	Route::apiResource('employees', UserController::class);

	Route::apiResource('employee-presences', EmployeePresenceController::class);

	Route::apiResource('insureds', InsuredController::class);

	Route::get('products/count', [ProductController::class, 'count']);
	Route::apiResource('products', ProductController::class);

	Route::get('locations', [LocationController::class, 'index']);

	Route::get('product-sales', [ProductSaleController::class, 'index']);

	Route::get('sales/count', [SaleController::class, 'count']);
	Route::apiResource('sales', SaleController::class);

	Route::get('stocks/count', [StockController::class, 'count']);
	Route::apiResource('stocks', StockController::class);

	Route::get('suppliers/count', [SupplierController::class, 'count']);
	Route::apiResource('suppliers', SupplierController::class);
});


Route::any('/{path}', function () {
	$url = url()->full();
	$method = request()->method();
	return HttpResponse::error(message: "A rota {$url} com o método {$method} não foi encontrada", status: HttpStatusCode::NOT_FOUND);
})->where('path', '([A-z\d\-\/_.]+)?');
