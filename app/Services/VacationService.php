<?php

namespace App\Services;

use App\Models\Vacation;
use Barryvdh\DomPDF\Facade\Pdf;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VacationService
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
		$request->desired_days = $date->days;

		return $request;
	}

	public function buildPDF(Vacation $vacation): string
	{
		$employee = $vacation->employee;
		$name = Str::slug($employee->name);
		$pdf = Pdf::loadView('pdfs.admin-docs.vacation', [
			'vacation' => $vacation
		]);
		$fileName = "requisicao-de-ferias-{$name}-{$employee->id}-{$vacation->id}.pdf";
		$filePath = "vacations/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
