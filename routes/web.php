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
Route::match(['get', 'post'], 'autorizacao-conducao/{employee}', [AdminDocsController::class, 'autorizacaoConducao']);
Route::match(['get', 'post'], 'declaracao-trabalho/{employee}', [AdminDocsController::class, 'declaracaoTrabalho']);
Route::match(['get', 'post'], 'formulario-admissao/{employee}', [AdminDocsController::class, 'formularioAdmissao']);
Route::match(['get', 'post'], 'justificativo-falta/{employee}', [AdminDocsController::class, 'justificativoFalta']);
Route::match(['get', 'post'], 'recibo-salario/{employee}', [AdminDocsController::class, 'reciboSalario']);
Route::match(['get', 'post'], 'requisicao-feria/{employee}', [AdminDocsController::class, 'requisicaoFeria']);

Route::view('/{path}', 'app')->where(
	'path',
	'([A-z\d\-\/_.]+)?'
);
Route::view('redefinir-senha', 'admin')->name('password.reset');


Route::fallback(function () {
	return response()->json(['message' => 'Não encontrado']);
});
