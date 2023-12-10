<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
	/**
	 * @return \Illuminate\Support\Collection
	 */
	public function collection()
	{
		$data = [['Código', 'Nome', 'E-mail', 'Data']];
		$users = User::all();

		for ($i = 0; $i < count($users); $i++) {
			$user = $users[$i];
			array_push($data, [$user->id, $user->name, $user->email, $user->created_at]);
		}
		return new Collection($data);
	}
}
