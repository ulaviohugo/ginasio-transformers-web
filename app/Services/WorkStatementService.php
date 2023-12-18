<?php

namespace App\Services;

use App\Models\WorkStatement;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class WorkStatementService
{
	public function buildPDF(WorkStatement $workStatement): string
	{
		$employee = $workStatement->employee;
		$name = Str::slug($employee->name);
		$pdf = Pdf::loadView('pdfs.admin-docs.work-statement', [
			'statement' => $workStatement
		]);
		$fileName = "declaracao-{$name}-{$employee->id}-{$workStatement->id}.pdf";
		$filePath = "work-statement/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
