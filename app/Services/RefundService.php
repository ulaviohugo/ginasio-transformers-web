<?php

namespace App\Services;

use App\Models\Refund;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RefundService
{
	public function transformData(&$request): Request
	{
		$request->purchase_date = date('Y-m-d', strtotime($request->purchase_date));

		return $request;
	}

	public function buildPDF(Refund $refund): string
	{
		$customer = $refund->customer;
		$name = Str::slug($customer->name);
		$pdf = Pdf::loadView('pdfs.admin-docs.refund-form', [
			'refund' => $refund
		]);
		$fileName = "reembolso-{$name}-{$customer->id}-{$refund->id}.pdf";
		$filePath = "refunds/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
