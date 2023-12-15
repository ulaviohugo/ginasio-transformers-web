<?php

namespace App\Helpers;

use App\Models\SalaryReceipt;

class SalaryReceiptHelper
{
	public static function getData(SalaryReceipt $salaryReceipt)
	{
		$workedDays = $salaryReceipt->work_days ??  SalaryHelper::WORK_DAYS;
		$currentBaseSalary = SalaryHelper::getSalaryPerDay($salaryReceipt->base_salary_received, $workedDays) * $workedDays;
		$_irtPercent = SalaryHelper::getIRTPercent($currentBaseSalary);
		$irtPercent = $_irtPercent > 0 ? "{$_irtPercent}%" : 'Isento';

		$irtValue = SalaryHelper::getIRTValue($currentBaseSalary);
		$inssValue = SalaryHelper::getINSS($currentBaseSalary);
		return [
			[
				'title' => 'Código',
				'contents' => [
					'10', '20', '30', '40', '50', '60', '70', '80', '90'
				]
			],
			[
				'title' => 'Descrição',
				'contents' => [
					'Salário base',
					'Subsídio de alimentação',
					'Subsídio de produtividade',
					'Subsídio de Transporte',
					'Abono de Família',
					'INSS',
					'IRT',
					'Subsídio de férias',
					'13º Décimo terceiro'
				]
			],
			[
				'title' => 'Referência',
				'contents' => [
					"{$workedDays} Dias",
					"{$workedDays} Dias",
					"{$workedDays} Dias",
					"{$workedDays} Dias",
					'Mensal',
					'3%',
					$irtPercent,
					'',
					''
				]
			],
			[
				'title' => 'Vencimentos',
				'contents' => [
					$currentBaseSalary,
					$salaryReceipt->meal_allowance ?? 0,
					$salaryReceipt->productivity_allowance ?? 0,
					$salaryReceipt->transportation_allowance ?? 0,
					$salaryReceipt->family_allowance ?? 0,
					0,
					0,
					$salaryReceipt->holiday_allowance ?? 0,
					$salaryReceipt->christmas_allowance ?? 0,
				]
			],
			[
				'title' => 'Descontos',
				'contents' => [
					0, 0, 0, 0, 0, $inssValue, $irtValue, 0, 0
				]
			]
		];
	}
}
