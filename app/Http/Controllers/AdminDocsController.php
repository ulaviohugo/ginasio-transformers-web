<?php

namespace App\Http\Controllers;

use App\Helpers\SalaryHelper;
use App\Helpers\SalaryReceiptHelper;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminDocsController extends Controller
{
	public function advertencia(User $employee)
	{
		// return view('pdfs.admin-docs.advertencia', compact('employee'));
		$pdf = Pdf::loadView('pdfs.admin-docs.advertencia', compact('employee'));
		$name = Str::slug($employee->name);
		return	$pdf->stream("advertencia-{$employee->id}-{$name}.pdf");
	}

	public function autorizacaoConducao(User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.autorizacao-conducao', compact('employee'));
		$name = Str::slug($employee->name);
		return	$pdf->stream("autorizacao-conducao-{$employee->id}-{$name}.pdf");
	}

	public function reciboSalario(Request $request, User $employee)
	{
		$query = request();
		$workDays = $request->work_days ?? $query->query('work_days') ??  SalaryHelper::WORK_DAYS;

		$salaryInfo = SalaryReceiptHelper::getData($employee, $workDays);
		// return view('pdfs.salary-receipt', compact('employee', 'salaryInfo'));

		$pdf = Pdf::loadView('pdfs.salary-receipt', compact('employee', 'salaryInfo'));
		$name = Str::slug($employee->name);
		return	$pdf->stream("recibo-salario-{$employee->id}-{$name}.pdf");
	}
}