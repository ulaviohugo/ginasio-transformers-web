<?php

namespace App\Services;

use App\Helpers\DBHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphSaleStoreService
{
	public function execute(Request $request)
	{
		$month = $request->month;
		$year = $request->year;

		$productsQuantity = DB::table(DBHelper::TB_PRODUCT_SALES . ' AS a')
			->select('b.name AS field', DB::raw('SUM(a.quantity) as value'))
			->join(DBHelper::TB_PRODUCTS . ' AS b', 'b.id', 'a.product_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$productsAmount = DB::table(DBHelper::TB_PRODUCT_SALES . ' AS a')
			->select('b.name AS field', DB::raw('SUM(a.total_value) as value'))
			->join(DBHelper::TB_PRODUCTS . ' AS b', 'b.id', 'a.product_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$categoriesQuantity = DB::table(DBHelper::TB_PRODUCT_SALES . ' AS a')
			->select('b.name AS field', DB::raw('SUM(a.quantity) as value'))
			->join(DBHelper::TB_CATEGORIES . ' AS b', 'b.id', 'a.category_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$categoriesAmount = DB::table(DBHelper::TB_PRODUCT_SALES . ' AS a')
			->select('b.name AS field', DB::raw('SUM(a.total_value) as value'))
			->join(DBHelper::TB_CATEGORIES . ' AS b', 'b.id', 'a.category_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$paymentMethodsQuantity = DB::table(DBHelper::TB_SALES)
			->select('payment_method AS field', DB::raw('SUM(quantity) as value'))
			->whereMonth('created_at', $month)
			->whereYear('created_at', $year)
			->groupBy('payment_method')
			->get();

		$paymentMethodsAmount = DB::table(DBHelper::TB_SALES)
			->select('payment_method AS field', DB::raw('SUM(total_value) as value'))
			->whereMonth('created_at', $month)
			->whereYear('created_at', $year)
			->groupBy('payment_method')
			->get();

		$employeesQuantity = DB::table(DBHelper::TB_SALES . ' AS a')
			->select('b.name AS field', DB::raw('SUM(a.quantity) as value'))
			->join(DBHelper::TB_USERS . ' AS b', 'b.id', 'a.user_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		$employeesAmount = DB::table(DBHelper::TB_SALES . ' AS a')
			->select('b.name AS field', DB::raw('SUM(a.total_value) as value'))
			->join(DBHelper::TB_USERS . ' AS b', 'b.id', 'a.user_id')
			->whereMonth('a.created_at', $month)
			->whereYear('a.created_at', $year)
			->groupBy('b.name')
			->get();

		return [
			'products_quantity' => $productsQuantity,
			'products_amount' => $productsAmount,
			'categories_quantity' => $categoriesQuantity,
			'categories_amount' => $categoriesAmount,
			'payment_methods_quantity' => $paymentMethodsQuantity,
			'payment_methods_amount' => $paymentMethodsAmount,
			'employees_quantity' => $employeesQuantity,
			'employees_amount' => $employeesAmount,
		];
	}
}
