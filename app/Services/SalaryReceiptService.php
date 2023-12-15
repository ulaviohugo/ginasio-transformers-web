<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Helpers\SalaryHelper;
use App\Helpers\SalaryReceiptHelper;
use App\Models\SalaryReceipt;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SalaryReceiptService
{
	public function execute(Request $request, User $employee)
	{
		try {
			DB::beginTransaction();

			$salaryReceipt = $this->saveSalaryReceipt($request, $employee);

			$salaryInfo = SalaryReceiptHelper::getData($salaryReceipt);

			$pdf = $this->buildPDF($salaryInfo, $salaryReceipt);

			$salaryReceipt->update(['file_path' => $pdf['url']]);
			DB::commit();
			return $salaryReceipt;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao processar salário.' . $th->getMessage());
		}
	}

	private function saveSalaryReceipt(Request $request, User $employee)
	{
		$work_days = $request->work_days ??  SalaryHelper::WORK_DAYS;
		$year = $request->year ??  date('Y');
		$month = $request->month ??  date('m');

		$base_salary = $employee->base_salary;

		$base_salary_received = floatval($request->base_salary_received ?? (SalaryHelper::getSalaryPerDay($base_salary)) * $work_days);
		$meal_allowance = floatval($request->meal_allowance ?? 0);
		$productivity_allowance = floatval($request->productivity_allowance ?? 0);
		$transportation_allowance = floatval($request->transportation_allowance ?? 0);
		$family_allowance = floatval($request->family_allowance ?? 0);
		$christmas_allowance = floatval($request->christmas_allowance ?? 0);
		$holiday_allowance = floatval($request->holiday_allowance ?? 0);


		$irtValue = SalaryHelper::getIRTValue($base_salary_received);
		$irtPercent = SalaryHelper::getIRTPercent($base_salary_received);

		$inssValue = SalaryHelper::getINSS($base_salary_received);
		$inssPercent = 3; //fixed value

		$grossSalary = $base_salary_received +
			$meal_allowance +
			$productivity_allowance +
			$transportation_allowance +
			$family_allowance +
			$christmas_allowance +
			$holiday_allowance;
		$totalDiscount = $irtValue + $inssValue;
		$net_salary = $grossSalary - $totalDiscount;

		return SalaryReceipt::create([
			'employee_id' => $request->employee_id,
			'work_days' => $work_days,
			'year' => $year,
			'month' => $month,
			'observation' => $request->observation,
			'base_salary' => $base_salary,
			'base_salary_received' => $base_salary_received,
			'net_salary' => $net_salary,
			'gross_salary' => $grossSalary,
			'meal_allowance' => $meal_allowance,
			'productivity_allowance' => $productivity_allowance,
			'transportation_allowance' => $transportation_allowance,
			'family_allowance' => $family_allowance,
			'christmas_allowance' => $christmas_allowance,
			'holiday_allowance' => $holiday_allowance,
			'total_salary_discounts' => $totalDiscount,
			'inss_discount' => $inssValue,
			'inss_discount_percent' => $inssPercent,
			'irt_discount' => $irtValue,
			'irt_discount_percent' => $irtPercent,
		]);
	}

	private function buildPDF($salaryInfo, SalaryReceipt $salaryReceipt)
	{
		$employee = $salaryReceipt->employee;

		$name = Str::slug($employee->name);

		$pdf = Pdf::loadView('pdfs.salary-receipt', [
			'salaryInfo' => $salaryInfo,
			'salaryReceipt' => $salaryReceipt
		]);
		$month = str_pad($salaryReceipt->month, 2, '0', STR_PAD_LEFT);
		$fileName = "recibo-{$name}-{$employee->id}-{$salaryReceipt->year}-{$month}.pdf";
		$filePath = "salary-receipts/$fileName";
		Storage::put($filePath, $pdf->output());
		return	[
			'url' => $filePath,
			'content' => FileHelper::convertToBase64($pdf->output(), 'pdf'),
		];
	}
}
