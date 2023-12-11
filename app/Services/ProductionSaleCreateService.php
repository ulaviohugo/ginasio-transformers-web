<?php

namespace App\Services;

use App\Models\ProductionStock;
use App\Models\ProductionSale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductionSaleCreateService
{
	public function execute(Request $request, InvoiceGeneratorService $invoiceGenerator)
	{
		try {
			DB::beginTransaction();
			$productSales = $request->product_sales;
			$countProducts = count($productSales);

			//Handle data to calculate values
			$totalValue = 0;
			$totalBalance = 0;
			$totalQuantity = 0;
			for ($i = 0; $i < $countProducts; $i++) {
				$productSale = $productSales[$i];
				//ProductSale data
				$quantity = intval($productSale['quantity']);
				$unitPrice = floatval($productSale['unit_price']);
				$balance = isset($productSale['balance']) ? floatval($productSale['balance']) : 0;
				$prdTotalValue = $unitPrice * $quantity;
				$prdTotalPaid = $prdTotalValue - $balance;

				$productSales[$i]['total_value'] = $prdTotalValue;
				$productSales[$i]['amount_paid'] = $prdTotalPaid;

				//Sale data
				$totalQuantity += $quantity;
				$totalValue += $unitPrice * $quantity;
				$totalBalance += $balance;
			}
			$amountPaid = $totalValue - $totalBalance;

			//Store Sale
			$userId = User::currentUserId();
			$sale = ProductionSale::create([
				'end_product' => $request->end_product,
				'total_value' => $totalValue,
				'amount_paid' => $amountPaid,
				'quantity' => $totalQuantity,
				'balance' => $totalBalance,
				'payment_method' => $request->payment_method,
				'employee_id' => $request->employee_id ?? $userId,
				'user_id' => $userId
			]);

			//Store ProductSale
			for ($i = 0; $i < $countProducts; $i++) {
				$productSales[$i]['sale_id'] = $sale->id;

				$data = (new Request())->merge(
					$productSales[$i] +
						['payment_method' => $request->payment_method] +
						['employee_id' => $request->employee_id]
				);
				(new ProductionProductSaleCreateService)->execute($data);

				$stock = ProductionStock::find($data['lot']);
				$stock->quantity -= intval($data['quantity']);
				$stock->save();
			}

			// Invoice
			/* 		if ($request->send_invoice == 'email') {
				(new InvoiceSendEmailService)->execute($invoiceGenerator, $sale);
			} else {
				$output = $invoiceGenerator->execute($sale)->output();
				PDFHelper::generatePdfPath(customerName: $sale->customer?->name, saleId: $sale->id, pdfOutPut: $output);
				$pdfLink = PDFHelper::getPdfLink(customerName: $sale->customer?->name, saleId: $sale->id);
				$sale->invoice = $pdfLink;
			} */

			DB::commit();
			return $sale;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw $th;
		}
	}
}
