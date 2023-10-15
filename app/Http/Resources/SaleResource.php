<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		return [
			'customer_id' => $this->customer_id,
			'total_value' => $this->total_value,
			'amount_paid' => $this->amount_paid,
			'discount' => $this->discount,
			'quantity' => $this->quantity,
			'employee_id' => $this->employee_id,
			'payment_method' => $this->payment_method,
			'user_id' => $this->user_id,
			'user_id_update' => $this->user_id_update,
			'user_id_update' => $this->user_id_update,

			'product_sales' => $this->whenLoaded('productSales'),
		];
	}
}
