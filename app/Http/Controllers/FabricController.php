<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Models\Fabric;

class FabricController extends Controller
{
	public function index()
	{
		try {
			return Fabric::select('id', 'name')->get();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar acessórios');
		}
	}
}
