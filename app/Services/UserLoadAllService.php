<?php

namespace App\Services;

use App\Helpers\NumberHelper;
use App\Models\User;

class UserLoadAllService
{
	public function  execute()
	{
		$id = request()->query('id');
		$name = request()->query('name');
		$email = request()->query('email');
		$phone = request()->query('phone');
		$date = request()->query('date');
		$gym_id = request()->query('gym_id');

		if (request()->query('filter')) {
			$queryParam = json_decode(request()->query('filter'));
			$id = isset($queryParam->id) ? $queryParam->id : null;
			$name = isset($queryParam->name) ? $queryParam->name : null;
			$email = isset($queryParam->email) ? $queryParam->email : null;
			$phone = isset($queryParam->phone) ? $queryParam->phone : null;
			$gym_id = isset($queryParam->gym_id) ? $queryParam->gym_id : null;
			$date = isset($queryParam->date) ? date('Y-m-d', strtotime($queryParam->date)) : null;
		}

		$users = User::orderBy('id', 'desc');

		if ($id) {
			$users = $users->where('id', $id);
		}
		if ($name) {
			$users = $users->where('name', 'LIKE', "{$name}%");
		}
		if ($email) {
			$users = $users->where('email', $email);
		}
		if ($gym_id) {
			$users = $users->where('gym_id', $gym_id);
		}
		if ($phone) {
			$users = $users->where('phone', NumberHelper::convertToNumber($phone));
		}
		if ($date) {
			$users = $users->whereDate('created_at', $date);
		}
		return $users->get();
	}
}
