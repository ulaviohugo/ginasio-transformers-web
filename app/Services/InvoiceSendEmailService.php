<?php

namespace App\Services;

use App\Helpers\PDFHelper;
use App\Mail\CustomerInvoiceMail;
use App\Models\Sale;
use Exception;
use Illuminate\Support\Facades\Mail;

class InvoiceSendEmailService
{
	public function execute(InvoiceGeneratorService $invoiceGeneratorService, Sale $sale)
	{
		try {
			$customer = $sale->customer;
			if (!$customer?->email) {
				throw new Exception("O cliente {$customer->name} não tem e-mail associado.");
			}
			$customerName = $customer->name;
			$pdf = $invoiceGeneratorService->execute($sale)->output();
			$pdfPath = PDFHelper::generatePdfPath(customerName: $customerName, saleId: $sale->id, pdfOutPut: $pdf);
			Mail::to($customer)->queue(new CustomerInvoiceMail($sale, $customer, $pdfPath));
		} catch (\Throwable $th) {
			throw new Exception(message: 'Erro ao enviar factura por email.' . $th->getMessage());
		}
	}
}
