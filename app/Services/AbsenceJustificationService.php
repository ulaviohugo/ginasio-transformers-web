<?php

namespace App\Services;

use App\Models\AbsenceJustification;
use Barryvdh\DomPDF\Facade\Pdf;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AbsenceJustificationService
{
	public function transformData(&$request): Request
	{
		$startsAt = date('Y-m-d', strtotime($request->starts_at));
		$endsAt = date('Y-m-d', strtotime($request->ends_at));

		$startTime = new DateTime($startsAt);
		$endTime = new DateTime($endsAt);
		$date = $endTime->diff($startTime);

		$request->starts_at = $startsAt;
		$request->ends_at = $endsAt;
		$request->absent_days = $date->days;

		return $request;
	}

	public function buildPDF(AbsenceJustification $justification): string
	{
		$employee = $justification->employee;
		$name = Str::slug($employee->name);
		$pdf = Pdf::loadView('pdfs.admin-docs.absence-justification', [
			'justification' => $justification
		]);
		$fileName = "justificacao-de-falta-{$name}-{$employee->id}-{$justification->id}.pdf";
		$filePath = "absence-justifications/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
