<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\CashRegisterCreateRequest;
use App\Models\CashRegister;
use App\Models\User;

class CashRegisterController extends Controller
{
	public function store(CashRegisterCreateRequest $request)
	{
		try {
			$cashRegister = CashRegister::first();
			if (!$cashRegister?->id) {
				$cashRegister = CashRegister::create([
					'balance' => $request->balance ?? $request->initial_balance,
					'initial_balance' => $request->initial_balance,
					'user_id' => User::currentUserId(),
				]);
			}
			return HttpResponse::success(data: $cashRegister);
		} catch (\Throwable $th) {
			HttpResponse::error(message: 'Erro ao consultar caixa');
		}
	}

	public function show()
	{
		try {
			$cashRegister = CashRegister::first();
			return HttpResponse::success(data: $cashRegister);
		} catch (\Throwable $th) {
			HttpResponse::error(message: 'Erro ao consultar caixa');
		}
	}
}
