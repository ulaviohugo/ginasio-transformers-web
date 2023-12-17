<?php

namespace App\Services;

use App\Helpers\NumberHelper;
use App\Helpers\SalaryHelper;
use App\Models\SalaryReceipt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SalaryReceiptService
{
	public function transformData(&$request, $base_salary): Request
	{
		$work_days = $request->work_days ??  SalaryHelper::WORK_DAYS;

		$request->work_days = intval($work_days);
		$request->base_salary = floatval($request->base_salary ?? $base_salary);
		$request->base_salary_received = SalaryHelper::getSalaryPerDay($base_salary) * $work_days;
		$request->meal_allowance = floatval($request->meal_allowance ?? 0);
		$request->productivity_allowance = floatval($request->productivity_allowance ?? 0);
		$request->transportation_allowance = floatval($request->transportation_allowance ?? 0);
		$request->family_allowance = floatval($request->family_allowance ?? 0);
		$request->christmas_allowance = floatval($request->christmas_allowance ?? 0);
		$request->holiday_allowance = floatval($request->holiday_allowance ?? 0);

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
		$netSalary = $grossSalary - $totalDiscount;

		$request->net_salary = $netSalary;
		$request->gross_salary = $grossSalary;
		$request->inss_discount = $inssValue;
		$request->inss_discount_percent = $inssPercent;
		$request->irt_discount = $irtValue;
		$request->irt_discount_percent = $irtPercent;
		$request->total_salary_discounts = $totalDiscount;

		return $request;
	}

	public function buildTable(SalaryReceipt $salaryReceipt)
	{
		$irt = $salaryReceipt->irt_discount_percent ? "{$salaryReceipt->irt_discount_percent}%" : "Isento";
		$data = [
			['Código', 'Descrição', 'Referência', 'Vencimentos', 'Descontos'],
			[1,	"Salário base", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->base_salary_received), 0],
			[2,	"Subsídio de alimentação", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->meal_allowance),	0],
			[3,	"Subsídio de produtividade", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->productivity_allowance),	0],
			[4,	"Subsídio de Transporte", "{$salaryReceipt->work_days} Dias",	NumberHelper::formatCurrency($salaryReceipt->transportation_allowance),	0],

		];
		if ($salaryReceipt->family_allowance) {
			array_push($data, [5,	"Abono de Família",	"Mensal",	NumberHelper::formatCurrency($salaryReceipt->family_allowance),	0]);
		}
		if ($salaryReceipt->holiday_allowance) {
			array_push($data, [6,	"Subsídio de férias", "",		NumberHelper::formatCurrency($salaryReceipt->holiday_allowance),	0]);
		}
		if ($salaryReceipt->christmas_allowance) {
			array_push($data, [7,	"13º Décimo terceiro", "",		NumberHelper::formatCurrency($salaryReceipt->christmas_allowance),	0]);
		}
		array_push(
			$data,
			[8,	"INSS",	"{$salaryReceipt->inss_discount_percent}%",	0,	NumberHelper::formatCurrency($salaryReceipt->inss_discount)],
			[9,	"IRT",	$irt,	0,	NumberHelper::formatCurrency($salaryReceipt->irt_discount)],
		);
		return $data;
	}

	public function buildPDF($salaryInfo, SalaryReceipt $salaryReceipt, $sufixo = null): string
	{
		$employee = $salaryReceipt->employee;

		$name = Str::slug($employee->name);

		$pdf = Pdf::loadView('pdfs.salary-receipt', [
			'salaryInfo' => $salaryInfo,
			'salaryReceipt' => $salaryReceipt
		]);
		$month = str_pad($salaryReceipt->month, 2, '0', STR_PAD_LEFT);
		$fileName = "recibo-{$name}-{$employee->id}-{$salaryReceipt->year}-{$month}{$sufixo}.pdf";
		$filePath = "salary-receipts/$fileName";
		Storage::put($filePath, $pdf->output());
		return $filePath;
	}
}
