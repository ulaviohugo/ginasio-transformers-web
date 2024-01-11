<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TuitionFeeResource extends JsonResource
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
			'athlete_id' => $this->athlete_id,
			'year' => $this->year,
			'month' => $this->month,
			'amount' => $this->amount,
			'fine' => $this->fine,
			'file_path' => $this->file_path ? FileHelper::storageLink($this->file_path) : null,
			'user_id' => $this->user_id,
			'user_id' => $this->user_id,
			'user_id_update' => $this->user_id_update,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,

			'athlete' => new AthleteResource($this->whenLoaded('athlete')),
			'user' => new UserBaseResource($this->whenLoaded('user')),
		];
	}
}
