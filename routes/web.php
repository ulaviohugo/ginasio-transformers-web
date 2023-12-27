<?php

use App\Exports\UsersExport;
use App\Http\Controllers\AdminDocsController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;
use Maatwebsite\Excel\Facades\Excel;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



Route::view('', 'app');
Route::match(['get', 'post'], 'factura-venda/{sale}', [SaleController::class, 'invoice']);
// Route::match(['get', 'post'], 'factura-venda/{sale}', [InvoiceController::class, 'sale']);
Route::match(['get', 'post'], 'advertencia/{employee}', [AdminDocsController::class, 'advertencia']);
Route::match(['get', 'post'], 'autorizacao-conducao/{employee}', [AdminDocsController::class, 'drivingPermission']);

Route::match(['get', 'post'], 'users', function () {
	return Excel::download(new UsersExport(), 'user.xlsx');
});

Route::view('/{path}', 'app')->where(
	'path',
	'([A-z\d\-\/_.]+)?'
);
Route::view('redefinir-senha', 'admin')->name('password.reset');


Route::fallback(function () {
	return response()->json(['message' => 'Não encontrado']);
});
