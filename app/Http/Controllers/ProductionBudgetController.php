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

			$date = null;
			$customerId = null;
			$id = null;

			if (request()->query('filter')) {
				$queryParam = json_decode(request()->query('filter'));
				$date = isset($queryParam->date) ? $queryParam->date : null;
				$customerId = isset($queryParam->customer_id) ? $queryParam->customer_id : null;
				$id = isset($queryParam->id) ? $queryParam->id : null;
			}

			$productionBudgets = ProductionBudget::orderBy('id', 'desc');
			if ($date) {
				$productionBudgets = $productionBudgets->whereDate('date', $date);
			}
			if ($customerId) {
				$productionBudgets = $productionBudgets->where('customer_id', $customerId);
			}
			if ($id) {
				$productionBudgets = $productionBudgets->where('id', $id);
			}

			$productionBudgets = $productionBudgets->get();
			$productionBudgets->load($this->relationship);

			$productionBudgets->map(function ($query) {
				$this->buildRelationship($query);
			});
			return ProductionBudgetResource::collection($productionBudgets);
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar orçamento' . $th->getMessage());
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

	private function buildRelationship($query)
	{
		$query->customer = $query->customer->only('id', 'name');
		$query->cuttingEmployee = $query->cuttingEmployee->only('id', 'name', 'position', 'role', 'photo');
		$query->sewingEmployee = $query->sewingEmployee->only('id', 'name', 'position', 'role', 'photo');

		$query->productionAccessories->map(function ($query) {
			$name = $query->accessory->name;
			$query->name = $name;
			unset($query->accessory);
		});

		$query->productionFabrics->map(function ($query) {
			$name = $query->fabric->name;
			$query->name = $name;
			unset($query->fabric);
		});
	}
}
