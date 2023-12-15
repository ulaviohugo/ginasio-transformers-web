<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\SalaryReceiptService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminDocsController extends Controller
{
	public function advertencia(User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.advertencia', compact('employee'));
		$name = Str::slug($employee->name);
		return	$pdf->stream("advertencia-{$employee->id}-{$name}.pdf");
	}

	public function drivingPermission(User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.autorizacao-conducao', compact('employee'));
		$name = Str::slug($employee->name);
		return	$pdf->stream("autorizacao-conducao-{$employee->id}-{$name}.pdf");
	}

	public function salaryReceipt(Request $request, SalaryReceiptService $service, User $employee)
	{
		return $service->execute($request, $employee);
	}

	public function employeeStatement(Request $request, User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.declaracao-trabalho', compact('employee'));
		return	$pdf->stream("declaracao-trabalho-{$employee->id}-{$employee->name}.pdf");
	}

	public function absenceJustification(Request $request, User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.justificativo-falta', compact('employee'));
		return	$pdf->stream("justificativo-falta-{$employee->id}-{$employee->name}.pdf");
	}

	public function vacationRequest(Request $request, User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.requisicao-feria', compact('employee'));
		return	$pdf->stream("requisicao-feria-{$employee->id}-{$employee->name}.pdf");
	}

	public function employeeAdmission(Request $request, User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.formulario-admissao', compact('employee'));
		return	$pdf->stream("formulario-admissao-{$employee->id}-{$employee->name}.pdf");
	}

	public function refundForm(Request $request)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.formulario-reembolso');
		return	$pdf->stream("formulario-reembolso.pdf");
	}
}
