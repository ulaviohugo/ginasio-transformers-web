<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\SaleCreateRequest;
use App\Http\Resources\SaleResource;
use App\Models\Sale;
use App\Services\SaleCreateService;

class SaleController extends Controller
{
	public function index()
	{
		try {
			$sales = Sale::all();
			$sales->load('productSales');
			return SaleResource::collection($sales);
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda');
		}
	}

	public function store(SaleCreateRequest $request, SaleCreateService $service)
	{
		try {
			$createdSale = $service->execute($request);
			return HttpResponse::success(data: $createdSale);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar venda' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			return HttpResponse::success(data: Sale::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda');
		}
	}
}
