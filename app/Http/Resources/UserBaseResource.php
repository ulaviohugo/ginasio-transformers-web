<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserBaseResource extends JsonResource
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
			'email' => $this->email,
			'photo' => $this->photo ? FileHelper::storageLink($this->photo) : null,
			'gender' => $this->gender,
			'position' => $this->position,
			'can_login' => $this->can_login,
			'role' => $this->role,
			'user_name' => $this->user_name,
		];
	}
}
