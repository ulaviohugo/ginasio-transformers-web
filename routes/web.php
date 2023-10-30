<?php

use App\Http\Controllers\AdminDocsController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;

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
Route::match(['get', 'post'], 'factura-venda/{sale}', [InvoiceController::class, 'sale']);
Route::match(['get', 'post'], 'advertencia/{employee}', [AdminDocsController::class, 'advertencia']);

Route::view('/{path}', 'app')->where(
	'path',
	'([A-z\d\-\/_.]+)?'
);
Route::view('redefinir-senha', 'admin')->name('password.reset');


Route::fallback(function () {
	return response()->json(['message' => 'Não encontrado']);
});
