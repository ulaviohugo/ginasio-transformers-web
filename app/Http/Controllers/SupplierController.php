<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\SupplierCreateRequest;
use App\Models\Supplier;
use App\Services\SupplierCreateService;

class SupplierController extends Controller
{
	public function index()
	{
		try {
			return Supplier::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar fornecedor');
		}
	}

	public function store(SupplierCreateRequest $request, SupplierCreateService $service)
	{
		try {
			$createdSupplier = $service->execute($request);
			return HttpResponse::success(data: $createdSupplier);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar fornecedor' . $th->getMessage());
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
}
