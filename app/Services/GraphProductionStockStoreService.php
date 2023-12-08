<?php

namespace App\Services;

use App\Helpers\DBHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphProductionStockStoreService
{
	public function execute(Request $request)
	{
		$month = $request->month;
		$year = $request->year;


		$productsQuantity = DB::table(DBHelper::TB_PRODUCTION_STOCKS . ' AS a')
			->select('b.name AS field', DB::raw('CAST(SUM(a.quantity) AS DOUBLE) AS value'))
			->join(DBHelper::TB_PRODUCTS . ' AS b', 'b.id', 'a.product_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$productsAmount = DB::table(DBHelper::TB_PRODUCTION_STOCKS . ' AS a')
			->select('b.name AS field', DB::raw('CAST(SUM(a.total_value) AS DOUBLE) AS value'))
			->join(DBHelper::TB_PRODUCTS . ' AS b', 'b.id', 'a.product_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$categoriesQuantity = DB::table(DBHelper::TB_PRODUCTION_STOCKS . ' AS a')
			->select('b.name AS field', DB::raw('CAST(SUM(a.quantity) AS DOUBLE) AS value'))
			->join(DBHelper::TB_CATEGORIES . ' AS b', 'b.id', 'a.category_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$categoriesAmount = DB::table(DBHelper::TB_PRODUCTION_STOCKS . ' AS a')
			->select('b.name AS field', DB::raw('CAST(SUM(a.total_value) AS DOUBLE) AS value'))
			->join(DBHelper::TB_CATEGORIES . ' AS b', 'b.id', 'a.category_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$paymentMethodsAmount = DB::table(DBHelper::TB_PRODUCTION_SALES)
			->select('payment_method AS field', DB::raw('CAST(SUM(total_value) AS DOUBLE) AS value'))
			->whereMonth('created_at', $month)
			->whereYear('created_at', $year)
			->groupBy('payment_method')
			->get();

		return [
			'products_quantity' => $productsQuantity,
			'products_amount' => $productsAmount,
			'categories_quantity' => $categoriesQuantity,
			'categories_amount' => $categoriesAmount,
			'payment_methods_amount' => $paymentMethodsAmount,
		];
	}
}
