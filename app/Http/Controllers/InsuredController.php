<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\InsuredCreateRequest;
use App\Http\Requests\InsuredUpdateRequest;
use App\Models\Insured;
use App\Services\InsuredCreateService;
use App\Services\InsuredUpdateService;

class InsuredController extends Controller
{
	public function index()
	{
		try {
			return Insured::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar presença');
		}
	}

	public function store(InsuredCreateRequest $request, InsuredCreateService $service)
	{
		try {
			$createdInsured =	$service->execute($request);
			return HttpResponse::success(data: $createdInsured);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar presença');
		}
	}

	public function update(InsuredUpdateRequest $request, InsuredUpdateService $service, Insured $employeePresence)
	{
		try {
			$employeePresence =	$service->execute($request, $employeePresence);
			return HttpResponse::success(data: $employeePresence);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar presença');
		}
	}
}
