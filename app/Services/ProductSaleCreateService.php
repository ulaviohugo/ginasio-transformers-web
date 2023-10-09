<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductSale;
use App\Models\User;
use Illuminate\Http\Request;

class ProductSaleCreateService
{
	public function execute(Request $request)
	{
		$productSale =	ProductSale::create([
			'product_id' => $request->product_id,
			'sale_id' => $request->sale_id,
			'quantity' => $request->quantity,
			'total_value' => $request->total_value,
			'unit_price' => $request->unit_price,
			'amount_paid' => $request->amount_paid,
			'color' => $request->color,
			'size' => $request->size,
			'discount' => $request->discount,
			'user_id' => User::currentUserId(),
		]);

		$product = Product::find($request->product_id);

		$transactionService = new TransactionCreateService();
		$transactionService->execute((new Request())->merge([
			'description' => "Venda de {$request->quantity} produto(s): {$product->name}",
			'operation_type' => 'Entrada',
			'amount' => $request->amount_paid,
			'payment_method' => $request->payment_method
		]));

		return $productSale;
	}
}
