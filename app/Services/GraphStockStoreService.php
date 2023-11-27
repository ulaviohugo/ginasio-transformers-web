<?php

namespace App\Services;

use App\Helpers\DBHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphStockStoreService
{
	public function execute(Request $request)
	{
		$month = $request->month;
		$year = $request->year;

		$products = DB::table(DBHelper::TB_STOCK . ' AS a')
			->select('b.name AS field', DB::raw('COUNT(a.id) as value'))
			->join(DBHelper::TB_PRODUCTS . ' AS b', 'b.id', 'a.product_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$categories = DB::table(DBHelper::TB_STOCK . ' AS a')
			->select('b.name AS field', DB::raw('COUNT(a.id) as value'))
			->join(DBHelper::TB_CATEGORIES . ' AS b', 'b.id', 'a.category_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$paymentMethods = DB::table(DBHelper::TB_STOCK)
			->select('payment_method AS field', DB::raw('COUNT(id) as value'))
			->whereMonth('created_at', $month)
			->whereYear('created_at', $year)
			->groupBy('payment_method')
			->get();

		return [
			'products' => $products,
			'categories' => $categories,
			'payment_methods' => $paymentMethods
		];
	}
}
