<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
			'bar_code' => $this->bar_code,
			'photo' => $this->photo ? FileHelper::storageLink($this->photo) : null,
			'category_id' => $this->category_id,
			'price' => $this->price,
			'user_id' => $this->user_id,
			'user_id_update' => $this->user_id_update,
		];
	}
}
