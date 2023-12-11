<?php

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use App\Http\Controllers\AccessoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeePresenceController;
use App\Http\Controllers\FabricController;
use App\Http\Controllers\GraphController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductionBudgetController;
use App\Http\Controllers\ProductionCategoryController;
use App\Http\Controllers\ProductionProductController;
use App\Http\Controllers\ProductionSaleController;
use App\Http\Controllers\ProductionStockController;
use App\Http\Controllers\ProductionSupplierController;
use App\Http\Controllers\ProductSaleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
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

	Route::apiResource('accessories', AccessoryController::class);

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

	Route::apiResource('fabrics', FabricController::class);

	// Route::apiResource('insureds', InsuredController::class);

	Route::apiResource('notifications', NotificationController::class);

	Route::apiResource('production-budgets', ProductionBudgetController::class);
	Route::apiResource('production-categories', ProductionCategoryController::class);
	Route::apiResource('production-products', ProductionProductController::class);
	Route::apiResource('production-sales', ProductionSaleController::class);
	Route::apiResource('production-stocks', ProductionStockController::class);
	Route::apiResource('production-suppliers', ProductionSupplierController::class);

	Route::get('products/count', [ProductController::class, 'count']);
	Route::apiResource('products', ProductController::class);

	Route::get('locations', [LocationController::class, 'index']);

	Route::apiResource('product-sales', ProductSaleController::class);

	Route::get('sales/count', [SaleController::class, 'count']);
	Route::apiResource('sales', SaleController::class);

	Route::get('stocks/count', [StockController::class, 'count']);
	Route::apiResource('stocks', StockController::class);

	Route::get('suppliers/count', [SupplierController::class, 'count']);
	Route::apiResource('suppliers', SupplierController::class);

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
