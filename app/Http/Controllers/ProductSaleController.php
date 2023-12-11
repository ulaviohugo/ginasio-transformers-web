<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\ProductSaleUpdateRequest;
use App\Models\ProductSale;
use App\Services\ProductSaleUpdateService;

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

	public function update(ProductSaleUpdateRequest $request, ProductSaleUpdateService $service, ProductSale $productSale)
	{
		try {
			$createdProductSale = $service->execute($request, $productSale);
			return HttpResponse::success(data: $createdProductSale);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar produto de venda' . $th->getMessage());
		}
	}

	public function destroy(ProductSale $productSale)
	{
		try {
			$productSale->delete();
			return HttpResponse::success(data: 'Produto excluído com sucesso');
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar produto de venda' . $th->getMessage());
		}
	}
}
