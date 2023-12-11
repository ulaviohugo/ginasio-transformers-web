<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\SaleCreateRequest;
use App\Models\ProductionProductSale;
use App\Models\ProductionSale;
use App\Services\InvoiceGeneratorService;
use App\Services\ProductionSaleCreateService;

class ProductionSaleController extends Controller
{
	public function index()
	{
		$id = null;
		$product_id = null;
		$end_product = null;
		$employee_id = null;
		$category_id = null;
		$date = null;

		if (request()->query('filter')) {
			$queryParam = json_decode(request()->query('filter'));
			$id = isset($queryParam->id) ? $queryParam->id : null;
			$end_product = isset($queryParam->end_product) ? $queryParam->end_product : null;
			$product_id = isset($queryParam->product_id) ? $queryParam->product_id : null;
			$employee_id = isset($queryParam->employee_id) ? $queryParam->employee_id : null;
			$category_id = isset($queryParam->category_id) ? $queryParam->category_id : null;
			$date = isset($queryParam->date) ? $queryParam->date : null;
		}

		try {
			$sales = ProductionSale::orderBy('id', 'desc');
			if ($id) {
				$sales = $sales->where('id', $id);
			}
			if ($end_product) {
				$sales = $sales->where('end_product', $end_product);
			}
			if ($category_id) {
				$sales = $sales->whereHas('productSales', function ($query) use ($category_id) {
					$query->where('category_id', $category_id);
				});
			}
			if ($product_id) {
				$sales = $sales->whereHas('productSales', function ($query) use ($product_id) {
					$query->where('product_id', $product_id);
				});
			}
			if ($employee_id) {
				$sales = $sales->where('employee_id', $employee_id);
			}
			if ($date) {
				$sales = $sales->whereDate('created_at', $date);
			}
			$sales = $sales->get();

			$sales->map(function ($query) {
				$query->employee = $query->employee?->only('id', 'name');
			});
			$sales->load([
				'productSales',
				'productSales.category',
				'productSales.product',
			]);
			return $sales;
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda' . $th->getMessage());
		}
	}

	public function store(SaleCreateRequest $request, ProductionSaleCreateService $service, InvoiceGeneratorService $invoiceGenerator)
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
			return HttpResponse::success(data: ProductionProductSale::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda');
		}
	}
}
