<?php

namespace App\Services;

use App\Models\Athlete;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AthleteService
{
	public function transformData(&$request): Request
	{
		$request->date_of_birth = date('Y-m-d', strtotime($request->date_of_birth));
		$request->email = $request->email ? strtolower($request->email) : null;
		$request->status = $request->status ? strtolower($request->status) : Athlete::STATUS_ACTIVE;
		return $request;
	}

	public function buildPDF(Athlete $athlete): string
	{
		$employee = $athlete->employee;
		$name = Str::slug($employee->name);
		$pdf = Pdf::loadView('pdfs.admin-docs.athlete-form', [
			'athlete' => $athlete
		]);
		$fileName = "formulario-atleta-{$name}-{$employee->id}-{$athlete->id}.pdf";
		$filePath = "athlete-forms/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
