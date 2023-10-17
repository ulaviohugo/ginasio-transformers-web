<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Models\Accessory;

class AccessoryController extends Controller
{
	public function index()
	{
		try {
			return Accessory::select('id', 'name')->get();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar acessórios');
		}
	}
}
