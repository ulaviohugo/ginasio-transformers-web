<?php

namespace App\Services;

use App\Models\ProductSale;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;

class SaleCreateService
{
	public function execute(Request $request)
	{
		$sale = Sale::create([
			'customer_id' => $request->customer_id,
			'total_value' => $request->total_value,
			'amount_paid' => $request->amount_paid,
			'discount' => $request->discount,
			'employee_id' => $request->employee_id,
			'payment_method' => $request->payment_method,
			'user_id' => User::currentUserId()
		]);

		$productSales = $request->product_sales;

		for ($i = 0; $i < count($productSales); $i++) {
			$productSales[$i]['sale_id'] = $sale->id;
		}
		ProductSale::insert($productSales);

		return $sale;
	}
}
