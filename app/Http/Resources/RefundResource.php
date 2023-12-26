<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RefundResource extends JsonResource
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
			'customer_id' => $this->customer_id,
			'file_path' => $this->file_path ? FileHelper::storageLink($this->file_path) : null,
			'purchase_date' => $this->purchase_date,
			'category_id' => $this->category_id,
			'product_id' => $this->product_id,
			'phone' => $this->phone,
			'email' => $this->email,
			'province_id' => $this->province_id,
			'municipality_id' => $this->municipality_id,
			'address' => $this->address,
			'iban' => $this->iban,
			'amount' => $this->amount,
			'description' => $this->description,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'customer' => new CustomerResource($this->whenLoaded('customer')),
			'category' => $this->whenLoaded('category'),
			'product' => $this->whenLoaded('product'),
			'user' => new UserBaseResource($this->whenLoaded('user')),
		];
	}
}
