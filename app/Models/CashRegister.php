<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashRegister extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_CASH_REGISTERS;

	protected $fillable = [
		'initial_balance',
		'balance',
		'user_id',
		'user_id_update',
	];

	static	public function getCashRegister()
	{
		$cashRegister = CashRegister::first();
		if (!$cashRegister) {
			$cashRegister =	CashRegister::create([
				'initial_balance' => 500000,
				'balance' => 500000,
				'user_id' => User::currentUserId(),
			]);
		}
		return $cashRegister;
	}
}
