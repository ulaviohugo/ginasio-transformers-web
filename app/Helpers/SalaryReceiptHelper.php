<?php

namespace App\Helpers;

use App\Models\User;

class SalaryReceiptHelper
{
	public static function getData(User $employee, int $workedDays = SalaryHelper::WORK_DAYS)
	{
		$currentBaseSalary = SalaryHelper::getSalaryPerDay($employee->base_salary) * $workedDays;
		$_irtPercent = SalaryHelper::getIRTPercent($currentBaseSalary);
		$irtPercent = $_irtPercent > 0 ? "{$_irtPercent}%" : 'Isento';

		$irtValue = SalaryHelper::getIRTValue($currentBaseSalary);
		$inssValue = SalaryHelper::getINSS($currentBaseSalary);
		return [
			[
				'title' => 'Código',
				'contents' => [
					'10', '20', '30', '40', '50', '60', '70', '80', '90', '100'
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
					'Outros descontos',
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
					'',
					''
				]
			],
			[
				'title' => 'Vencimentos',
				'contents' => [
					$currentBaseSalary, 5_000, 10_000, 1_000, 0, 0, 0, 0, 0, 0
				]
			],
			[
				'title' => 'Descontos',
				'contents' => [
					0, 0, 0, 0, 0, $inssValue, $irtValue, 0, 0, 0
				]
			]
		];
	}
}
