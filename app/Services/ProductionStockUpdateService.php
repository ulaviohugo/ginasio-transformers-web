<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Models\ProductionStock;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductionStockUpdateService
{
	public function execute(Request $request, ProductionStock $stock)
	{
		try {
			DB::beginTransaction();
			$userId = User::currentUserId();

			$unitPrice = floatval($request->unit_price);
			$quantity = intval($request->quantity);
			$totalValue = $unitPrice * $quantity;

			$stockData = [];
			if (FileHelper::isUploadable($request->photo)) {
				$photo = FileHelper::uploadBase64($request->photo, 'uploads/production-stocks');
				if ($stock->photo) {
					FileHelper::delete($stock->photo);
				}
				$stockData['photo'] = $photo;
			}
			$paid = $request->paid == 'true' || $request->paid == true;
			$stockData = [...$stockData, ...[
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
				'paid' => $paid,
				'purchase_date' => $request->purchase_date,
				'due_date' => $request->due_date,
				'user_id_update' => $userId,
			]];
			$stock->update($stockData);

			DB::commit();
			return $stock;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw $th;
		}
	}
}
