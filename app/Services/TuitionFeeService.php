<?php

namespace App\Services;

use App\Helpers\NumberHelper;
use App\Models\TuitionFee;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TuitionFeeService
{
	public function transformData(&$request): Request
	{
		$request->amount = NumberHelper::convertToNumber($request->amount);
		$request->fine = $request->fine ? NumberHelper::convertToNumber($request->fine) : 0;
		return $request;
	}

	public function buildPDF(TuitionFee $tuitionFee): string
	{
		$athlete = $tuitionFee->athlete;
		$name = Str::slug($athlete->name);
		$pdf = Pdf::loadView('pdfs.tuition-fee', [
			'tuitionFee' => $tuitionFee
		]);
		$fileName = "mensalidade-{$name}-{$athlete->id}-{$tuitionFee->year}-{$tuitionFee->month}.pdf";
		$filePath = "tuition-fees/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
