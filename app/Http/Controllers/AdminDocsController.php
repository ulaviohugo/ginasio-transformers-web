<?php

namespace App\Http\Controllers;

use App\Models\User;
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

	public function employeeStatement(Request $request, User $employee)
	{
		$pdf = Pdf::loadView('pdfs.admin-docs.declaracao-trabalho', compact('employee'));
		return	$pdf->stream("declaracao-trabalho-{$employee->id}-{$employee->name}.pdf");
	}
}
