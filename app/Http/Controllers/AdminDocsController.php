<?php

namespace App\Http\Controllers;

use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminDocsController extends Controller
{
	public function advertencia(User $employee)
	{
		// return view('admin-docs.advertencia', compact('employee'));
		$pdf = Pdf::loadView('admin-docs.advertencia', compact('employee'));
		return	$pdf->stream("factura{$employee->id}.pdf");
	}
}
