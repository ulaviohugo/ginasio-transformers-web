<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalaryReceiptResource extends JsonResource
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
			'employee_id' => $this->employee_id,
			'file_path' => $this->file_path ? FileHelper::storageLink($this->file_path) : null,
			'work_days' => $this->work_days,
			'year' => $this->year,
			'month' => $this->month,
			'observation' => $this->observation,
			'base_salary' => $this->base_salary,
			'base_salary_received' => $this->base_salary_received,
			'net_salary' => $this->net_salary,
			'gross_salary' => $this->gross_salary,
			'meal_allowance' => $this->meal_allowance,
			'productivity_allowance' => $this->productivity_allowance,
			'transportation_allowance' => $this->transportation_allowance,
			'family_allowance' => $this->family_allowance,
			'christmas_allowance' => $this->christmas_allowance,
			'holiday_allowance' => $this->holiday_allowance,
			'total_salary_discounts' => $this->total_salary_discounts,
			'inss_discount' => $this->inss_discount,
			'inss_discount_percent' => $this->inss_discount_percent,
			'irt_discount' => $this->irt_discount,
			'irt_discount_percent' => $this->irt_discount_percent,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'employee' => new UserResource($this->whenLoaded('employee')),
			'user' => new UserResource($this->whenLoaded('user')),
		];
	}
}
