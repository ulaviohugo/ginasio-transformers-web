<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

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
Route::view('/{path}', 'app')->where(
	'path',
	'([A-z\d\-\/_.]+)?'
);
Route::view('redefinir-senha', 'admin')->name('password.reset');


Route::fallback(function () {
	if (!Str::contains(url()->full(), '/admin/')) {
		return view('site.app');
	}
	return response()->json(['message' => 'Não encontrado']);
});
