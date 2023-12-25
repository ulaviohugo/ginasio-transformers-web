<?php

namespace App\Services;

use App\Models\Admission;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdmissionService
{
	public function transformData(&$request): Request
	{
		$request->working_tools = json_encode(array_values(array_unique($request->working_tools)));
		$request->clothes_production_training = json_encode(array_values(array_unique($request->clothes_production_training)));

		return $request;
	}

	public function buildPDF(Admission $admission): string
	{
		$employee = $admission->employee;
		$name = Str::slug($employee->name);
		$pdf = Pdf::loadView('pdfs.admin-docs.admission-form', [
			'admission' => $admission
		]);
		$fileName = "formulario-admissao-{$name}-{$employee->id}-{$admission->id}.pdf";
		$filePath = "admission-forms/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
