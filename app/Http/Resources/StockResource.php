<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
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
			'photo' => $this->photo ? FileHelper::storageLink($this->photo) : null,
			'lot' => $this->lot,
			'bar_code' => $this->bar_code,
			'supplier_id' => $this->supplier_id,
			'category_id' => $this->category_id,
			'product_id' => $this->product_id,
			'color' => $this->color,
			'size' => $this->size,
			'unit_price' => $this->unit_price,
			'quantity' => $this->quantity,
			'total_value' => $this->total_value,
			'payment_method' => $this->payment_method,
			'paid' => $this->paid,
			'purchase_date' => $this->purchase_date,
			'due_date' => $this->due_date,
			'employee_id' => $this->employee_id,
			'user_id' => $this->user_id,

			'product' => $this->whenLoaded('product'),
			'category' => $this->whenLoaded('category'),
		];
	}
}
