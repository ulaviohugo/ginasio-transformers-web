<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Services\GraphStockStoreService;

class GraphController extends Controller
{

	public function stockStore(GraphStockStoreService $service)
	{
		try {
			return HttpResponse::success(data: $service->execute());
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
