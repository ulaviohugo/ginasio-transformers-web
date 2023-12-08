<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Models\ProductionProductSale;

class ProductionProductSaleController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		try {
			return ProductionProductSale::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar produto');
		}
	}
}
