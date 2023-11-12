<?php

namespace App\Http\Controllers;

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
			$suppliers = Supplier::all();
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
