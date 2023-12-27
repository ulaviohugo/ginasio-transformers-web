<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VacationResource extends JsonResource
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
			'spent_days' => $this->spent_days,
			'desired_days' => $this->desired_days,
			'missing_days' => $this->missing_days,
			'starts_at' => $this->starts_at,
			'ends_at' => $this->ends_at,
			'paid_vacation' => $this->paid_vacation,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'employee' => new UserBaseResource($this->whenLoaded('employee')),
			'user' => new UserBaseResource($this->whenLoaded('user')),
		];
	}
}
