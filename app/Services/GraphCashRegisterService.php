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
		$gym_id = $request->gym_id;

		$paymentMethods = DB::table(DBHelper::TB_TRANSACTIONS . ' AS a') // Alias 'a' para a tabela 'tb_transactions'
			->select('payment_method AS field', DB::raw('CAST(SUM(amount) AS DOUBLE) AS value'))
			->whereMonth('a.created_at', $month) // Qualificando 'created_at' com o alias 'a'
			->whereYear('a.created_at', $year); // Qualificando 'created_at' com o alias 'a'

		if ($gym_id) {
			$paymentMethods = $paymentMethods->join('gyms AS b', 'a.gym_id', '=', 'b.id')
			->where('b.id', $gym_id);
		}

		$paymentMethods = $paymentMethods->groupBy('payment_method')
			->get();

		$operations = DB::table(DBHelper::TB_TRANSACTIONS . ' AS a') // Alias 'a' para a tabela 'tb_transactions'
			->select('operation_type AS field', DB::raw('CAST(SUM(amount) AS DOUBLE) AS value'))
			->whereMonth('a.created_at', $month) // Qualificando 'created_at' com o alias 'a'
			->whereYear('a.created_at', $year); // Qualificando 'created_at' com o alias 'a'

		if ($gym_id) {
			$operations = $operations->join('gyms AS b', 'a.gym_id', '=', 'b.id')
			->where('b.id', $gym_id);
		}

		$operations = $operations->groupBy('operation_type')
			->get();



		return [
			'operations_amount' => $operations,
			'payment_methods_amount' => $paymentMethods,
		];
	}
}
