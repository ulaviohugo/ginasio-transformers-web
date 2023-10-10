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
			$productSales = $request->product_sales;
			$countProducts = count($productSales);

			//Handle data to calculate values
			$totalValue = 0;
			$totalDiscount = 0;
			$totalQuantity = 0;
			for ($i = 0; $i < $countProducts; $i++) {
				$productSale = $productSales[$i];
				//ProductSale data
				$quantity = floatval($productSale['quantity']);
				$unitPrice = floatval($productSale['unit_price']);
				$discount = isset($productSale['discount']) ? floatval($productSale['discount']) : 0;
				$prdTotalValue = $unitPrice * $quantity;
				$prdTotalPaid = $prdTotalValue - $discount;

				$productSales[$i]['total_value'] = $prdTotalValue;
				$productSales[$i]['amount_paid'] = $prdTotalPaid;

				//Sale data
				$totalQuantity += $quantity;
				$totalValue += $unitPrice * $quantity;
				$totalDiscount += $discount;
			}
			$amountPaid = $totalValue - $totalDiscount;

			//Store Sale
			$userId = User::currentUserId();
			$sale = Sale::create([
				'customer_id' => $request->customer_id,
				'total_value' => $totalValue,
				'amount_paid' => $amountPaid,
				'quantity' => $totalQuantity,
				'discount' => $totalDiscount,
				'payment_method' => $request->payment_method,
				'employee_id' => $request->employee_id ?? $userId,
				'user_id' => $userId
			]);

			//Store ProductSale
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