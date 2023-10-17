<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\ProductionBudgetCreateRequest;
use App\Http\Resources\ProductionBudgetResource;
use App\Models\ProductionBudget;
use App\Services\ProductionBudgetService;
use Illuminate\Http\Request;

class ProductionBudgetController extends Controller
{
	private $relationship = [
		'customer',
		'cuttingEmployee',
		'sewingEmployee',
		'productionAccessories',
		'productionFabrics'
	];

	public function index()
	{
		try {
			$this->authorize('viewAny', ProductionBudget::class);
			$productionBudget = ProductionBudget::all();
			$productionBudget->load($this->relationship);
			return ProductionBudgetResource::collection($productionBudget);
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar orçamento');
		}
	}

	public function store(ProductionBudgetCreateRequest $request, ProductionBudgetService $service)
	{
		try {
			$createdProduction = $service->execute($request);
			return HttpResponse::success(data: new ProductionBudgetResource($createdProduction));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar orçamento');
		}
	}

	public function show(ProductionBudget $productionBudget)
	{
		//
	}

	public function update(Request $request, ProductionBudget $productionBudget)
	{
		//
	}

	public function destroy(ProductionBudget $productionBudget)
	{
		//
	}
}
