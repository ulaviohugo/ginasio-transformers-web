<?php

namespace App\Services;

use App\Models\TuitionFee;

class TuitionFeeLoadAllService
{
	public function  execute()
	{
		$athlete_id = null;
		$year = null;
		$month = null;
		$date = null;

		if (request()->query('filter')) {
			$queryParam = json_decode(request()->query('filter'));
			$athlete_id = isset($queryParam->athlete_id) ? $queryParam->athlete_id : null;
			$year = isset($queryParam->year) ? $queryParam->year : null;
			$month = isset($queryParam->month) ? $queryParam->month : null;
			$date = isset($queryParam->date) ? date('Y-m-d', strtotime($queryParam->date)) : null;
		}

		$tuitionFees = TuitionFee::orderBy('athlete_id', 'desc');

		if ($athlete_id) {
			$tuitionFees = $tuitionFees->where('athlete_id', $athlete_id);
		}
		if ($year) {
			$tuitionFees = $tuitionFees->where('year', $year);
		}
		if ($month) {
			$tuitionFees = $tuitionFees->where('month', $month);
		}
		if ($date) {
			$tuitionFees = $tuitionFees->whereDate('created_at', $date);
		}
		return $tuitionFees->get();
	}
}
