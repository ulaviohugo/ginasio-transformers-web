<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductionBudgetResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		return [
			'id' => $this->id,
			'end_product' => $this->end_product,
			'date' => $this->date,
			'photo' => $this->photo,
			'customer_id' => $this->customer_id,
			'customer_rating' => $this->customer_rating,
			'cutting_employee_id' => $this->cutting_employee_id,
			'cutting_cost' => $this->cutting_cost,
			'cutting_duration_per_minute' => $this->cutting_duration_per_minute,
			'sewing_employee_id' => $this->sewing_employee_id,
			'sewing_cost' => $this->sewing_cost,
			'sewing_duration_per_minute' => $this->sewing_duration_per_minute,
			'variable_cost' => $this->variable_cost,
			'finishing_cost' => $this->finishing_cost,
			'production_cost' => $this->production_cost,
			'selling_cost' => $this->selling_cost,
			'discount' => $this->discount,
			'total_to_pay' => $this->total_to_pay,
			'user_id' => $this->user_id,
			'user_id_update' => $this->user_id_update,

			'production_accessories' => $this->whenLoaded('productionAccessories'),
			'production_fabrics' => $this->whenLoaded('productionFabrics'),
		];
	}
}
