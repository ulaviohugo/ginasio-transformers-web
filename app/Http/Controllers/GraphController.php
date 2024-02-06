<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\GraphCashRegisterRequest;

use App\Services\GraphCashRegisterService;

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

	
}
