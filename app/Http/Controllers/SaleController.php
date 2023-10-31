<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\SaleCreateRequest;
use App\Models\ProductSale;
use App\Models\Sale;
use App\Services\InvoiceGeneratorService;
use App\Services\SaleCreateService;

class SaleController extends Controller
{
	public function index()
	{
		try {
			$sales = ProductSale::orderBy('id', 'desc')->get();
			$sales->map(function ($query) {
				$query->customer = $query->sale->customer?->only('id', 'name');
				$query->employee = $query->sale->employee?->only('id', 'name');
			});
			$sales->load([
				'product' => function ($query) {
					$query->select('id', 'name');
				},
				'category' => function ($query) {
					$query->select('id', 'name');
				},
				'sale'
			]);
			return $sales;
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda');
		}
	}

	public function store(SaleCreateRequest $request, SaleCreateService $service, InvoiceGeneratorService $invoiceGenerator)
	{
		try {
			$createdSale = $service->execute($request, $invoiceGenerator);
			return HttpResponse::success(data: $createdSale);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar venda. ' . $th->getMessage());
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
