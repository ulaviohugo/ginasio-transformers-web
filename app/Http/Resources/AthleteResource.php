<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AthleteResource extends JsonResource
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
			'name' => $this->name,
			'height' => $this->height,
			'date_of_birth' => $this->date_of_birth,
			'gender' => $this->gender,
			'marital_status' => $this->marital_status,
			'document_type' => $this->document_type,
			'document_number' => $this->document_number,
			'photo' => $this->photo ? FileHelper::storageLink($this->photo) : null,
			'phone' => $this->phone,
			'phone2' => $this->phone2,
			'email' => $this->email,
			'observation' => $this->observation,
			'health_history' => $this->health_history,
			'education_degree' => $this->education_degree,
			'starting_weight' => $this->starting_weight,
			'current_weight' => $this->current_weight,
			'goal_weight' => $this->goal_weight,
			'status' => $this->status,
			'country_id' => $this->country_id,
			'province_id' => $this->province_id,
			'municipality_id' => $this->municipality_id,
			'address' => $this->address,
			'user_id' => $this->user_id,
			'mensalidades' => $this->whenLoaded('mensalidades'),
			'user' => $this->whenLoaded('user'),
			'user_id_update' => $this->user_id_update,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'gym_id' => $this->gym_id,
		];
	}
}
