<?php

namespace App\Services;

use App\Models\CashRegister;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class TransactionCreateService
{
	public function execute(Request $request)
	{
		$cashRegister = CashRegister::getCashRegister();

		$dbBalance = $cashRegister->balance;
		$amount = $request->amount;
		$balance = $request->operation_type == 'Entrada' ? $dbBalance + $amount : $dbBalance - $amount;

		$userId = User::currentUserId();
		$transaction = Transaction::create([
			'description' => $request->description,
			'operation_type' => $request->operation_type,
			'amount' => $amount,
			'payment_method' => $request->payment_method,
			'date' => now(),
			'cash_register_id' => $cashRegister->id,
			'post_movement_balance' => $balance,
			'employee_id' => $request->employee_id ?? $userId,
			'user_id' => $userId
		]);

		$cashRegister->balance = $balance;
		$cashRegister->user_id_update = $userId;
		$cashRegister->update();

		return $transaction;
	}
}
