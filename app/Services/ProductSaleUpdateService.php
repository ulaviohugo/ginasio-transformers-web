<?php

namespace App\Services;

use App\Models\ProductSale;
use App\Models\User;
use Illuminate\Http\Request;

class ProductSaleUpdateService
{
	public function execute(Request $request, ProductSale $productSale)
	{
		$userId = User::currentUserId();
		$productSale->update([
			'product_id' => $request->product_id,
			'category_id' => $request->category_id,
			'sale_id' => $request->sale_id,
			'lot' => $request->lot,
			'bar_code' => $request->bar_code,
			'quantity' => $request->quantity,
			'total_value' => $request->total_value,
			'unit_price' => $request->unit_price,
			'amount_paid' => $request->amount_paid,
			'color' => $request->color,
			'size' => $request->size,
			'discount' => $request->discount,
			'employee_id' => $request->employee_id ?? $userId,
			'user_id_update' => $userId,
		]);
		info('DATA: ' . $productSale->toJson());
		return $productSale;
	}
}
