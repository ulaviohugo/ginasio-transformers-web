<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Models\Sale;
use App\Services\InvoiceGeneratorService;
use App\Services\InvoiceSendEmailService;

class InvoiceController extends Controller
{
	public function sale(
		InvoiceSendEmailService $invoiceSendEmailService,
		InvoiceGeneratorService $invoiceGeneratorService,
		Sale $sale
	) {
		try {
			$customer = $sale->customer;
			if (!$customer) {
				return HttpResponse::error(message: 'A compra especificada não tem nenhum cliente associado');
			}
			if (!$customer->email) {
				return HttpResponse::error(message: 'O cliente não tem um e-mail especificado para enviar a factura.');
			}
			$invoiceSendEmailService->execute($invoiceGeneratorService, $sale);
			return HttpResponse::success(message: 'Factura enviada por e-mail com sucesso');
		} catch (\Throwable $th) {
			return	HttpResponse::error(message: 'Erro ao enviar factura por e-mail' . $th->getMessage());
		}
	}
}
