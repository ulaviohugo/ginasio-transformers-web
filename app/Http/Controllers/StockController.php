<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\FileHelper;
use App\Helpers\HttpResponse;
use App\Http\Requests\StockCreateRequest;
use App\Http\Requests\StockUpdateRequest;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Services\StockCreateService;
use App\Services\StockUpdateService;

class StockController extends Controller
{
	private $relationship = ['category', 'product'];

	public function index()
	{
		try {
			$product_id = null;
			$supplier_id = null;
			$category_id = null;
			$date = null;

			if (request()->query('filter')) {
				$queryParam = json_decode(request()->query('filter'));
				$product_id = isset($queryParam->product_id) ? $queryParam->product_id : null;
				$supplier_id = isset($queryParam->supplier_id) ? $queryParam->supplier_id : null;
				$category_id = isset($queryParam->category_id) ? $queryParam->category_id : null;
				$date = isset($queryParam->date) ? $queryParam->date : null;
			}

			$stocks = Stock::orderBy('id', 'desc');

			if ($product_id) {
				$stocks = $stocks->where('product_id', $product_id);
			}
			if ($supplier_id) {
				$stocks = $stocks->where('supplier_id', $supplier_id);
			}
			if ($category_id) {
				$stocks = $stocks->where('category_id', $category_id);
			}
			if ($date) {
				$stocks = $stocks->whereDate('created_at', $date);
			}
			$stocks = $stocks->get();

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
			return HttpResponse::error(message: 'Erro ao cadastrar estoque' . $th->getMessage());
		}
	}


	public function update(StockUpdateRequest $request, StockUpdateService $service, Stock $stock)
	{
		try {
			$createdStock = $service->execute($request, $stock);
			$createdStock->load($this->relationship);
			return HttpResponse::success(data: new StockResource($createdStock));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar estoque' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			return HttpResponse::success(data: Stock::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar estoque');
		}
	}

	public function destroy(Stock $stock)
	{
		try {
			$photo = $stock->photo;
			$stock->delete();

			if ($photo) {
				FileHelper::delete($photo);
			}
			return HttpResponse::success(message: 'Entrada excluída com sucesso');
		} catch (\Throwable $th) {
			return ErrorHandler::handle(
				exception: $th,
				message: 'Erro ao excluir entrada',
			);
		}
	}
}
