<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
	public function sale(Sale $sale)
	{
		// return view('pdfs.invoices.sale', ['sale' => $sale]);
		Pdf::setOption(['defaultFont' => 'sans-serif']);
		$pdf = Pdf::loadView('pdfs.invoices.sale', ['sale' => $sale]);
		return $pdf->stream("factura-{$sale->id}.pdf");
	}
}
