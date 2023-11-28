<?php

namespace App\Services;

use App\Helpers\DBHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphCashRegisterService
{
	public function execute(Request $request)
	{
		$month = $request->month;
		$year = $request->year;

		$paymentMethods = DB::table(DBHelper::TB_TRANSACTIONS)
			->select('payment_method AS field', DB::raw('COUNT(id) as value'))
			->whereMonth('created_at', $month)
			->whereYear('created_at', $year)
			->groupBy('payment_method')
			->get();

		$operations = DB::table(DBHelper::TB_TRANSACTIONS)
			->select('operation_type AS field', DB::raw('COUNT(id) as value'))
			->whereMonth('created_at', $month)
			->whereYear('created_at', $year)
			->groupBy('operation_type')
			->get();


		return [
			'operations' => $operations,
			'payment_methods' => $paymentMethods,
		];
	}
}
