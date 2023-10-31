<?php

namespace App\Services;

use App\Models\Sale;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;

class InvoiceGeneratorService
{
	public function execute(Sale $sale)
	{
		try {
			return	Pdf::loadView('pdfs.invoices.sale', ['sale' => $sale]);
		} catch (\Throwable $th) {
			throw new Exception(message: 'Erro ao gerar factura.');
		}
	}
}
