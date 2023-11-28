<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockCreateService
{
	public function execute(Request $request)
	{
		try {
			DB::beginTransaction();
			$userId = User::currentUserId();

			$unitPrice = floatval($request->unit_price);
			$quantity = intval($request->quantity);
			$totalValue = $unitPrice * $quantity;

			$photo = null;
			if (FileHelper::isUploadable($request->photo)) {
				$photo = FileHelper::uploadBase64($request->photo, 'uploads/stocks');
			}

			$paid = $request->paid == 'true' || $request->paid == true;

			$stock =	Stock::create([
				'photo' => $photo,
				'bar_code' => $request->bar_code,
				'supplier_id' => $request->supplier_id,
				'category_id' => $request->category_id,
				'product_id' => $request->product_id,
				'color' => $request->color,
				'size' => $request->size,
				'unit_price' => $unitPrice,
				'quantity' => $quantity,
				'initial_quantity' => $quantity,
				'total_value' => $totalValue,
				'payment_method' => $request->payment_method,
				'paid' => $paid,
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
			DB::commit();
			return $stock;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw $th;
		}
	}
}
