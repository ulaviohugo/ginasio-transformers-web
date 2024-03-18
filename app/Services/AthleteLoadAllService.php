<?php

namespace App\Services;

use App\Helpers\NumberHelper;
use App\Models\Athlete;

class AthleteLoadAllService
{
	public function  execute()
	{
		$id = null;
		$name = null;
		$email = null;
		$phone = null;
		$date = null;
		$gym_id = null;

		if (request()->query('filter')) {
			$queryParam = json_decode(request()->query('filter'));
			$id = isset($queryParam->id) ? $queryParam->id : null;
			$name = isset($queryParam->name) ? $queryParam->name : null;
			$email = isset($queryParam->email) ? $queryParam->email : null;
			$phone = isset($queryParam->phone) ? $queryParam->phone : null;
			$gym_id = isset($queryParam->gym_id) ? $queryParam->gym_id : null;
			$date = isset($queryParam->date) ? date('Y-m-d', strtotime($queryParam->date)) : null;
		}

		$athletes = Athlete::orderBy('id', 'desc');

		if ($id) {
			$athletes = $athletes->where('id', $id);
		}
		if ($name) {
			$athletes = $athletes->where('name', 'LIKE', "{$name}%");
		}
		if ($email) {
			$athletes = $athletes->where('email', $email);
		}
		if ($gym_id) {
			$athletes = $athletes->where('gym_id', $gym_id);
		}
		if ($phone) {
			$athletes = $athletes->where('phone', NumberHelper::convertToNumber($phone));
		}
		if ($date) {
			$athletes = $athletes->whereDate('created_at', $date);
		}
		return $athletes->get();
	}
}
