<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
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
			'representative' => $this->representative,
			'email' => $this->email,
			'phone' => $this->phone,
			'photo' => $this->photo ? FileHelper::storageLink($this->photo) : null,
			'country_id' => $this->country_id,
			'province_id' => $this->province_id,
			'municipality_id' => $this->municipality_id,
			'address' => $this->address,
			'user_id' => $this->user_id,
			'user_id_update' => $this->user_id_update,

			'supplier_products' => $this->whenLoaded('supplierProducts'),
		];
	}
}
