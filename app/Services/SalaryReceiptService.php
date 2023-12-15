<?php

namespace App\Services;

use App\Helpers\SalaryHelper;
use App\Helpers\SalaryReceiptHelper;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SalaryReceiptService
{
	public function execute(Request $request, User $employee)
	{
		try {
			$query = request();
			$workDays = $request->work_days ?? $query->query('work_days') ??  SalaryHelper::WORK_DAYS;
			$year = $request->year ?? $query->query('year') ??  date('Y');
			$month = $request->month ?? $query->query('month') ??  date('m');
			$observation = $request->observation ?? $query->query('observation');

			$salaryInfo = SalaryReceiptHelper::getData($employee, $workDays);

			$pdf = Pdf::loadView('pdfs.salary-receipt', compact('employee', 'salaryInfo', 'year', 'month', 'observation'));
			$name = Str::slug($employee->name);
			return	$pdf->stream("recibo-salario-{$employee->id}-{$name}.pdf");
		} catch (\Throwable $th) {
			throw new Exception(message: 'Erro ao enviar factura por email.' . $th->getMessage());
		}
	}
}
