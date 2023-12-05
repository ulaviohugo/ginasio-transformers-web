<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Models\ProductionProduct;
use Illuminate\Http\Request;

class ProductionProductController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		try {
			return ProductionProduct::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar produto');
		}
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show(ProductionProduct $productionProduct)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, ProductionProduct $productionProduct)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(ProductionProduct $productionProduct)
	{
		//
	}
}
