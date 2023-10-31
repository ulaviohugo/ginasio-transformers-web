<?php

namespace App\Helpers;

use DateTime;
use Illuminate\Support\Facades\Storage;

class PDFHelper
{
	public static	function generatePdfPath(string $customerName = null, int $saleId, string $pdfOutPut)
	{
		$fileName = "Factura WO-{$saleId} - {$customerName}.pdf";
		Storage::put("/invoices/{$fileName}", $pdfOutPut);
		return storage_path('app/public/invoices/') . $fileName;
	}

	public static	function getPdfLink(string $customerName = null, int $saleId)
	{
		$fileName = "Factura WO-{$saleId} - {$customerName}.pdf";
		return asset("storage/invoices/{$fileName}");
	}
}
