<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\SaleCreateRequest;
use App\Models\ProductSale;
use App\Models\Sale;
use App\Services\InvoiceGeneratorService;
use App\Services\SaleCreateService;
use Barryvdh\DomPDF\Facade\Pdf;

class SaleController extends Controller
{
	public function index()
	{
		$product_id = null;
		$customer_id = null;
		$employee_id = null;
		$category_id = null;
		$date = null;

		if (request()->query('filter')) {
			$queryParam = json_decode(request()->query('filter'));
			$product_id = isset($queryParam->product_id) ? $queryParam->product_id : null;
			$customer_id = isset($queryParam->customer_id) ? $queryParam->customer_id : null;
			$employee_id = isset($queryParam->employee_id) ? $queryParam->employee_id : null;
			$category_id = isset($queryParam->category_id) ? $queryParam->category_id : null;
			$date = isset($queryParam->date) ? $queryParam->date : null;
		}

		try {
			$sales = ProductSale::orderBy('id', 'desc');
			if ($product_id) {
				$sales = $sales->where('product_id', $product_id);
			}
			if ($customer_id) {
				$sales = $sales->whereHas('sale', function ($query) use ($customer_id) {
					$query->where('customer_id', $customer_id);
				});
			}
			if ($employee_id) {
				$sales = $sales->whereHas('sale', function ($query) use ($employee_id) {
					$query->where('employee_id', $employee_id);
				});
			}
			if ($category_id) {
				$sales = $sales->where('category_id', $category_id);
			}
			if ($date) {
				$sales = $sales->whereDate('created_at', $date);
			}
			$sales = $sales->get();

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
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar venda' . $th->getMessage());
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

	public function invoice(Sale $sale)
	{
		try {
			$pdf = Pdf::loadView('pdfs.invoices.sale', compact('sale'));
			return $pdf->stream();
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
