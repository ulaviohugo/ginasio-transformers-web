<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\StockCreateRequest;
use App\Models\Stock;
use App\Services\StockCreateService;

class StockController extends Controller
{
	public function index()
	{
		try {
			return Stock::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda');
		}
	}

	public function store(StockCreateRequest $request, StockCreateService $service)
	{
		try {
			$createdStock = $service->execute($request);
			return HttpResponse::success(data: $createdStock);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar venda' . $th->getMessage());
		}
	}
}
