<?php

use App\Exports\UsersExport;
use App\Http\Controllers\AthleteController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\GymController;
use App\Http\Controllers\MensalidadeController;
use App\Models\Athlete;
use Barryvdh\DomPDF\Facade\Pdf;
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

Route::match(['get', 'post'], 'mensalidade', function () {
	$pdf = Pdf::loadView('pdfs.tuition-fee');
	return $pdf->stream();
}); 

Route::get('pdf/materiais', [EquipmentController::class, 'gerarPDF'])->name('gerar-pdf');
Route::get('pdf/atletas', [AthleteController::class, 'gerarPDF'])->name('gerar-pdf');
Route::get('pdf/mensalidades', [MensalidadeController::class, 'gerarPDF'])->name('gerar-pdf');
Route::get('pdf/gyms', [GymController::class, 'gerarPDF'])->name('gerar-pdf');

Route::view('/{path}', 'app')->where(
	'path',
	'([A-z\d\-\/_.]+)?'
);
Route::view('redefinir-senha', 'admin')->name('password.reset');


Route::fallback(function () {
	return response()->json(['message' => 'Não encontrado']);
});

