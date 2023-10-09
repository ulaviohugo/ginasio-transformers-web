<?php

namespace App\Services;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleCreateService
{
	public function execute(Request $request)
	{
		try {
			DB::beginTransaction();
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
			$countProducts = count($productSales);
			for ($i = 0; $i < $countProducts; $i++) {
				$productSales[$i]['sale_id'] = $sale->id;

				$data = (new Request())->merge($productSales[$i] + ['payment_method' => $request->payment_method]);
				(new ProductSaleCreateService)->execute($data);
			}
			DB::commit();
			return $sale;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw $th;
		}
	}
}
