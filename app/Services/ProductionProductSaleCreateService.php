<?php

namespace App\Services;

use App\Models\ProductionProduct;
use App\Models\ProductionProductSale;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class ProductionProductSaleCreateService
{
	public function execute(Request $request)
	{
		$userId = User::currentUserId();
		$productSale =	ProductionProductSale::create([
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
			'user_id' => $userId,
		]);

		$product = ProductionProduct::find($request->product_id);

		$transactionService = new TransactionCreateService();
		$transactionService->execute((new Request())->merge([
			'description' => "Saída de {$request->quantity} produto(s) de produção: {$product->name}",
			'operation_type' => Transaction::OPERATION_TYPE_IN,
			'amount' => $request->amount_paid,
			'payment_method' => $request->payment_method
		]));

		return $productSale;
	}
}
