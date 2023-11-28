<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\GraphSaleStoreRequest;
use App\Http\Requests\GraphStockStoreRequest;
use App\Services\GraphSaleStoreService;
use App\Services\GraphStockStoreService;

class GraphController extends Controller
{
	public function stockStore(GraphStockStoreRequest $request, GraphStockStoreService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function saleStore(GraphSaleStoreRequest $request, GraphSaleStoreService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute($request));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
