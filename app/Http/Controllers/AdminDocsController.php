<?php

namespace App\Http\Controllers;

use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
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
		// return view('pdfs.admin-docs.advertencia', compact('employee'));
		$pdf = Pdf::loadView('pdfs.admin-docs.autorizacao-conducao', compact('employee'));
		$name = Str::slug($employee->name);
		return	$pdf->stream("autorizacao-conducao-{$employee->id}-{$name}.pdf");
	}
}
