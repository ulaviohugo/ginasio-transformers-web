<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\SaleCreateRequest;
use App\Models\Sale;
use App\Services\SaleCreateService;

class SaleController extends Controller
{
	public function index()
	{
		try {
			return Sale::all();
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
}
