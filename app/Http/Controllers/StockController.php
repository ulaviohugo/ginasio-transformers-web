<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\StockCreateRequest;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Services\StockCreateService;

class StockController extends Controller
{
	private $relationship = ['category', 'product'];

	public function index()
	{
		try {
			$stocks = Stock::all();
			$stocks->load($this->relationship);
			return StockResource::collection($stocks);
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda');
		}
	}

	public function store(StockCreateRequest $request, StockCreateService $service)
	{
		try {
			$createdStock = $service->execute($request);
			$createdStock->load($this->relationship);
			return HttpResponse::success(data: new StockResource($createdStock));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar venda' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			return HttpResponse::success(data: Stock::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar stock');
		}
	}
}
