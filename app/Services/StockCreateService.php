<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Stock;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class StockCreateService
{
	public function execute(Request $request)
	{
		$userId = User::currentUserId();

		$unitPrice = floatval($request->unit_price);
		$quantity = intval($request->quantity);
		$totalValue = $unitPrice * $quantity;

		$stock =	Stock::create([
			'photo' => $request->photo,
			'lot' => $request->lot,
			'bar_code' => $request->bar_code,
			'supplier_id' => $request->supplier_id,
			'category_id' => $request->category_id,
			'product_id' => $request->product_id,
			'color' => $request->color,
			'size' => $request->size,
			'unit_price' => $unitPrice,
			'quantity' => $quantity,
			'total_value' => $totalValue,
			'payment_method' => $request->payment_method,
			'selling_price_unit' => $request->selling_price_unit,
			'paid' => $request->paid,
			'purchase_date' => $request->purchase_date,
			'due_date' => $request->due_date,
			'employee_id' => $request->employee_id ?? $userId,
			'user_id' => $userId,
		]);

		$product = Product::find($request->product_id);

		$transactionService = new TransactionCreateService();
		$transactionService->execute((new Request())->merge([
			'description' => "Compra de {$quantity} produto(s): {$product->name}",
			'operation_type' => Transaction::OPERATION_TYPE_OUT,
			'amount' => $totalValue,
			'payment_method' => $request->payment_method,
			'employee_id' => $request->employee_id,
		]));

		return $stock;
	}
}
