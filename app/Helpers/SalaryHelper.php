<?php

namespace App\Helpers;

class SalaryHelper
{
	const WORK_DAYS = 26;

	public static function getIRTValue(float $salary)
	{
		return ($salary * self::getIRTPercent($salary)) / 100;
	}

	public static function getIRTPercent(float $salary)
	{
		if ($salary > 10_000_000) return 25;
		if ($salary > 5_000_000) return 24.5;
		if ($salary > 2_500_000) return 24;
		if ($salary > 2_000_000) return 23;
		if ($salary > 1_500_000) return 22;
		if ($salary > 1_000_000) return 21;
		if ($salary > 500_000) return 20;
		if ($salary > 300_000) return 19;
		if ($salary > 200_000) return 18;
		if ($salary > 150_000) return 16;
		if ($salary > 100_000) return 13;
		if ($salary > 70_000) return 10;
		return 0;
	}

	public static function getINSS(float $salary)
	{
		return ($salary * 3) / 100;
	}

	public static function getSalaryPerDay(float $base_salary)
	{
		return $base_salary / self::WORK_DAYS;
	}

	public static function getSalaryPerHour(float $base_salary, int $workDays = self::WORK_DAYS)
	{
		return (self::getSalaryPerDay($base_salary, $workDays) * 4) / 9;
	}

	public static function getSalaryPerMinute(float $base_salary, int $workDays = self::WORK_DAYS)
	{
		return self::getSalaryPerHour($base_salary, $workDays) / 60;
	}
}
