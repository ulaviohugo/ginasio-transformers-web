<?php

namespace App\Services;

use App\Helpers\NumberHelper;
use App\Helpers\SalaryHelper;
use App\Http\Requests\StoreSalaryReceiptRequest;
use App\Models\SalaryReceipt;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SalaryReceiptCreateService
{
	public function execute(StoreSalaryReceiptRequest $request, User $employee)
	{
		try {
			DB::beginTransaction();

			$request = $this->transformData(request: $request, base_salary: $employee->base_salary);
			$salaryReceipt = $this->saveSalaryReceipt($request, $employee);
			$salaryInfo = $this->buildTable($salaryReceipt);
			$pdfUrl = $this->buildPDF($salaryInfo, $salaryReceipt);

			$salaryReceipt->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $salaryReceipt;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao processar salário.' . $th->getMessage());
		}
	}

	private function saveSalaryReceipt(Request $request, User $employee): SalaryReceipt
	{
		$work_days = $request->work_days ??  SalaryHelper::WORK_DAYS;
		$year = $request->year ??  date('Y');
		$month = $request->month ??  date('m');

		$base_salary = $employee->base_salary;

		$irtValue = SalaryHelper::getIRTValue($request->base_salary_received);
		$irtPercent = SalaryHelper::getIRTPercent($request->base_salary_received);

		$inssValue = SalaryHelper::getINSS($request->base_salary_received);
		$inssPercent = 3; //fixed value

		$grossSalary = $request->base_salary_received +
			$request->meal_allowance +
			$request->productivity_allowance +
			$request->transportation_allowance +
			$request->family_allowance +
			$request->christmas_allowance +
			$request->holiday_allowance;
		$totalDiscount = $irtValue + $inssValue;
		$net_salary = $grossSalary - $totalDiscount;

		return SalaryReceipt::create([
			'employee_id' => $request->employee_id,
			'work_days' => $work_days,
			'year' => $year,
			'month' => $month,
			'observation' => $request->observation,
			'base_salary' => $base_salary,
			'base_salary_received' => $request->base_salary_received,
			'net_salary' => $net_salary,
			'gross_salary' => $grossSalary,
			'meal_allowance' => $request->meal_allowance,
			'productivity_allowance' => $request->productivity_allowance,
			'transportation_allowance' => $request->transportation_allowance,
			'family_allowance' => $request->family_allowance,
			'christmas_allowance' => $request->christmas_allowance,
			'holiday_allowance' => $request->holiday_allowance,
			'total_salary_discounts' => $totalDiscount,
			'inss_discount' => $inssValue,
			'inss_discount_percent' => $inssPercent,
			'irt_discount' => $irtValue,
			'irt_discount_percent' => $irtPercent,
			'user_id' => User::currentUserId(),
		]);
	}

	private function transformData(&$request, $base_salary): Request
	{
		$work_days = $request->work_days ??  SalaryHelper::WORK_DAYS;

		$request->base_salary_received = floatval($request->base_salary_received ?? (SalaryHelper::getSalaryPerDay($base_salary)) * $work_days);
		$request->meal_allowance = floatval($request->meal_allowance ?? 0);
		$request->productivity_allowance = floatval($request->productivity_allowance ?? 0);
		$request->transportation_allowance = floatval($request->transportation_allowance ?? 0);
		$request->family_allowance = floatval($request->family_allowance ?? 0);
		$request->christmas_allowance = floatval($request->christmas_allowance ?? 0);
		$request->holiday_allowance = floatval($request->holiday_allowance ?? 0);
		return $request;
	}

	private function buildTable(SalaryReceipt $salaryReceipt)
	{
		$irt = $salaryReceipt->irt_discount_percent ? "{$salaryReceipt->irt_discount_percent}%" : "Isento";
		$data = [
			['Código', 'Descrição', 'Referência', 'Vencimentos', 'Descontos'],
			[1,	"Salário base", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->base_salary_received), 0],
			[2,	"Subsídio de alimentação", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->meal_allowance),	0],
			[3,	"Subsídio de produtividade", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->productivity_allowance),	0],
			[4,	"Subsídio de Transporte", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->transportation_allowance),	0],
			[5,	"Abono de Família",	"Mensal",	NumberHelper::formatCurrency($salaryReceipt->family_allowance),	0],
			[6,	"INSS",	"{$salaryReceipt->inss_discount_percent}%",	0,	NumberHelper::formatCurrency($salaryReceipt->inss_discount)],
			[7,	"IRT",	$irt,	0,	NumberHelper::formatCurrency($salaryReceipt->irt_discount)],
		];
		if ($salaryReceipt->holiday_allowance) {
			array_push($data, [9,	"Subsídio de férias", "",		NumberHelper::formatCurrency($salaryReceipt->holiday_allowance),	0]);
		}
		if ($salaryReceipt->christmas_allowance) {
			array_push($data, [10,	"13º Décimo terceiro", "",		NumberHelper::formatCurrency($salaryReceipt->christmas_allowance),	0]);
		}
		return $data;
	}

	private function buildPDF($salaryInfo, SalaryReceipt $salaryReceipt): string
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
		return $filePath;
	}
}
