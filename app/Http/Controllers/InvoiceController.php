<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Mail\CustomerInvoiceMail;
use App\Models\Sale;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

class InvoiceController extends Controller
{
	public function sale(Sale $sale)
	{
		try {
			$customer = $sale->customer;
			if (!$customer) {
				return HttpResponse::error(message: 'A compra especificada não tem nenhum cliente especificado');
			}
			$pdf = Pdf::loadView('pdfs.invoices.sale', ['sale' => $sale]);
			Mail::to($customer)->send(new CustomerInvoiceMail($sale, $customer, $pdf->output()));
			return response()->json(['message' => 'Factura enviada por e-mail com sucesso']);
			// return view('pdfs.invoices.sale', ['sale' => $sale]);
			// return $pdf->stream("factura-{$sale->id}.pdf");
		} catch (\Throwable $th) {
			HttpResponse::error(message: 'Erro ao enviar factura por e-mail');
		}
	}
}
