<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Models\ProductionAccessory;
use App\Models\ProductionBudget;
use App\Models\ProductionFabric;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductionBudgetService
{
	public function execute(Request $request)
	{
		try {
			DB::beginTransaction();

			$photo = null;
			if (FileHelper::isUploadable($request->photo)) {
				$photo = FileHelper::uploadBase64($request->photo, 'uploads/product-budgets');
			}
			$productionBudget =	ProductionBudget::create([
				'end_product' => $request->end_product,
				'date' => date('Y-m-d', strtotime($request->date)),
				'photo' => $photo,
				'customer_id' => $request->customer_id,
				'customer_rating' => $request->customer_rating,
				'cutting_employee_id' => $request->cutting_employee_id,
				'cutting_cost' => $request->cutting_cost,
				'cutting_duration_per_minute' => $request->cutting_duration_per_minute,
				'sewing_employee_id' => $request->sewing_employee_id,
				'sewing_cost' => $request->sewing_cost,
				'sewing_duration_per_minute' => $request->sewing_duration_per_minute,
				'variable_cost' => $request->variable_cost,
				'finishing_cost' => $request->finishing_cost,
				'production_cost' => $request->production_cost,
				'selling_cost' => $request->selling_cost,
				'discount' => $request->discount,
				'total_to_pay' => $request->total_to_pay,
				'user_id' => $request->user_id,
				'user_id_update' => $request->user_id_update,
				'user_id' => User::currentUserId(),
			]);

			$this->insertAccessories($request->production_accessories, $productionBudget->id);
			$this->insertFabrics($request->production_fabrics, $productionBudget->id);

			DB::commit();
			return $productionBudget;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw $th;
		}
	}

	private function insertAccessories($productionAccessories, $productionId)
	{
		$accessoryData =	array_map(function ($data) use ($productionId) {
			return [
				'production_id' => $productionId,
				'accessory_id' => $data['accessory_id'],
				'quantity' => $data['quantity'],
				'price' => $data['price'],
				'created_at' => now()
			];
		}, $productionAccessories);
		ProductionAccessory::insert($accessoryData);
	}

	private function insertFabrics($productionFabrics, $productionId)
	{
		$fabricData =	array_map(function ($data) use ($productionId) {
			return [
				'production_id' => $productionId,
				'fabric_id' => $data['fabric_id'],
				'color' => $data['color'],
				'meters' => $data['meters'],
				'cost' => $data['cost'],
				'created_at' => now()
			];
		}, $productionFabrics);
		ProductionFabric::insert($fabricData);
	}
}
