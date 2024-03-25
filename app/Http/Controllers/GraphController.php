<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\GraphCashRegisterRequest;
use App\Http\Requests\GraphMensalidadeRequest;
use App\Services\GraphCashRegisterService;
use App\Services\GraphMensalidadeService;

class GraphController extends Controller
{
	public function cashRegister(GraphCashRegisterRequest $request, GraphCashRegisterService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function mensalidades(GraphMensalidadeRequest $request, GraphMensalidadeService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
