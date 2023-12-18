<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkStatementResource extends JsonResource
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
			'purpose' => $this->purpose,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'employee' => new UserBaseResource($this->whenLoaded('employee')),
			'user' => new UserBaseResource($this->whenLoaded('user')),
		];
	}
}
