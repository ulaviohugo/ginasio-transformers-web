<?php

namespace App\Http\Controllers;

use App\Helpers\DBHelper;
use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\SupplierCreateRequest;
use App\Http\Requests\SupplierUpdateRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use App\Services\SupplierCreateService;
use App\Services\SupplierUpdateService;

class SupplierController extends Controller
{
	private $load = [
		'supplierProducts',
		'supplierProducts.category',
		'supplierProducts.product',
		'supplierProducts.supplier'
	];

	public function index()
	{
		try {
			$id = null;
			$municipality_id = null;
			$category_id = null;
			$product_id = null;

			if (request()->query('filter')) {
				$queryParam = json_decode(request()->query('filter'));
				$id = isset($queryParam->id) ? $queryParam->id : null;
				$municipality_id = isset($queryParam->municipality_id) ? $queryParam->municipality_id : null;
				$category_id = isset($queryParam->category_id) ? $queryParam->category_id : null;
				$product_id = isset($queryParam->product_id) ? $queryParam->product_id : null;
			}

			$suppliers = Supplier::orderBy('id', 'desc');
			if ($id) {
				$suppliers = $suppliers->where('id', $id);
			}
			if ($municipality_id) {
				$suppliers = $suppliers->where('municipality_id', $municipality_id);
			}
			if ($category_id) {
				$suppliers = $suppliers->whereIn('id', function ($query) use ($category_id) {
					$query->select('supplier_id')
						->from(DBHelper::TB_SUPPLIER_PRODUCTS)
						->where('category_id', $category_id);
				});
			}
			if ($category_id) {
				$suppliers = $suppliers->whereIn('id', function ($query) use ($category_id) {
					$query->select('supplier_id')
						->from(DBHelper::TB_SUPPLIER_PRODUCTS)
						->where('category_id', $category_id);
				});
			}
			if ($product_id) {
				$suppliers = $suppliers->whereIn('id', function ($query) use ($product_id) {
					$query->select('supplier_id')
						->from(DBHelper::TB_SUPPLIER_PRODUCTS)
						->where('product_id', $product_id);
				});
			}

			$suppliers = $suppliers->get();
			$suppliers->load($this->load);
			return SupplierResource::collection($suppliers);
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar fornecedor');
		}
	}

	public function store(SupplierCreateRequest $request, SupplierCreateService $service)
	{
		try {
			$createdSupplier = $service->execute($request);
			$createdSupplier->load($this->load);
			return HttpResponse::success(data: new SupplierResource($createdSupplier));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar fornecedor' . $th->getMessage());
		}
	}

	public function update(SupplierUpdateRequest $request, SupplierUpdateService $service, Supplier $supplier)
	{
		try {
			$updatedSupplier = $service->execute($request, $supplier);
			$updatedSupplier->load($this->load);
			return HttpResponse::success(data: new SupplierResource($updatedSupplier));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar fornecedor. ' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			return HttpResponse::success(data: Supplier::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar fornecedor');
		}
	}

	public function destroy(Supplier $supplier)
	{
		try {
			$supplier->delete();
			return HttpResponse::success(message: 'Fornecedor excluído com sucesso');
		} catch (\Throwable $th) {
			return ErrorHandler::handle(
				exception: $th,
				message: 'Erro ao excluir fornecedor' . $th->getMessage(),
				messagePermission: 'Não tem permissão para excluir este recurso',
			);
		}
	}
}
