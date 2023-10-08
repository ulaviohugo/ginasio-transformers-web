<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Models\ProductSale;

class ProductSaleController extends Controller
{
	public function index()
	{
		try {
			return ProductSale::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar produto');
		}
	}
}
