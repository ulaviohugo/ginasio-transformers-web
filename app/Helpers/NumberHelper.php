<?php

namespace App\Helpers;

use DateTime;

class NumberHelper
{
	public static	function convertToNumber($number, $nullable = false)
	{
		if (!$number) {
			return ($nullable ? null : 0);
		}

		if (is_numeric($number)) {
			return $number;
		}

		if ($number instanceof DateTime) {
			return $number->getTimestamp();
		}

		return floatval(str_replace(' ', '', strval($number)));
	}

	public static function formatCurrency($number)
	{
		if (!$number) return '0';

		$numStr = number_format((float)$number, 2, '.', '');

		return number_format((float)$numStr, 2, ',', '.');
	}
}
