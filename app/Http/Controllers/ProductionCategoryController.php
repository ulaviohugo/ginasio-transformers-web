<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Models\ProductionCategory;
use Illuminate\Http\Request;

class ProductionCategoryController extends Controller
{
	public function index()
	{
		try {
			return ProductionCategory::all();
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
	public function show(ProductionCategory $productionCategory)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, ProductionCategory $productionCategory)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(ProductionCategory $productionCategory)
	{
		//
	}
}
