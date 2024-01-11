<?php

use App\Exports\UsersExport;
use Barryvdh\DomPDF\Facade\Pdf;
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

Route::match(['get', 'post'], 'users', function () {
	return Excel::download(new UsersExport(), 'user.xlsx');
});
Route::match(['get', 'post'], 'mensalidade', function () {
	$pdf = Pdf::loadView('pdfs.tuition-fee');
	return $pdf->stream();
});

Route::view('/{path}', 'app')->where(
	'path',
	'([A-z\d\-\/_.]+)?'
);
Route::view('redefinir-senha', 'admin')->name('password.reset');


Route::fallback(function () {
	return response()->json(['message' => 'Não encontrado']);
});
