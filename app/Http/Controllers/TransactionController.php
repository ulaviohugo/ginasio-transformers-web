<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\TransactionCreateRequest;
use App\Models\Transaction;
use App\Services\TransactionCreateService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		try {
			$year = null;
			$month = null;
			$paymentMethod = null;

			if (request()->query('filter')) {
				$queryParam = json_decode(request()->query('filter'));
				$year = isset($queryParam->year) ? $queryParam->year : null;
				$month = isset($queryParam->month) ? $queryParam->month : null;
				$paymentMethod = isset($queryParam->payment_method) ? $queryParam->payment_method : null;
			}

			$transactions = Transaction::orderBy('date', 'desc');
			if ($year) {
				$transactions = $transactions->whereYear('date', $year);
			}
			if ($month) {
				$transactions = $transactions->whereMonth('date', $month);
			}
			if ($paymentMethod) {
				$transactions = $transactions->where('payment_method', $paymentMethod);
			}
			$transactions = $transactions->get();

			$transactions->load('cashRegister');
			return $transactions;
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar transacções' . $th->getMessage());
		}
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(TransactionCreateRequest $request, TransactionCreateService $service)
	{
		try {
			$createdSale = $service->execute($request);
			$createdSale->load('cashRegister');
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
