<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\GraphCashRegisterRequest;
use App\Http\Requests\GraphProductionSaleRequest;
use App\Http\Requests\GraphProductionStockRequest;
use App\Http\Requests\GraphSaleRequest;
use App\Http\Requests\GraphStockRequest;
use App\Services\GraphCashRegisterService;
use App\Services\GraphProductionSaleService;
use App\Services\GraphProductionStockService;
use App\Services\GraphSaleService;
use App\Services\GraphStockService;

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

	public function stock(GraphStockRequest $request, GraphStockService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function sale(GraphSaleRequest $request, GraphSaleService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function productionStock(GraphProductionStockRequest $request, GraphProductionStockService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function productionSale(GraphProductionSaleRequest $request, GraphProductionSaleService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
