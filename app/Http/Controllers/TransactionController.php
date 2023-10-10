<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\TransactionCreateRequest;
use App\Services\TransactionCreateService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(TransactionCreateRequest $request, TransactionCreateService $service)
	{
		try {
			$createdSale = $service->execute($request);
			return HttpResponse::success(data: $createdSale);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar venda' . $th->getMessage());
		}
	}

	/**
	 * Display the specified resource.
	 */
	public function show(string $id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, string $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(string $id)
	{
		//
	}
}
