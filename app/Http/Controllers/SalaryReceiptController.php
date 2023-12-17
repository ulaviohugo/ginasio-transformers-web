<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\StoreSalaryReceiptRequest;
use App\Http\Requests\UpdateSalaryReceiptRequest;
use App\Http\Resources\SalaryReceiptResource;
use App\Models\SalaryReceipt;
use App\Models\User;
use App\Services\SalaryReceiptCreateService;

class SalaryReceiptController extends Controller
{
	public function index()
	{
		try {
			$salaryReceipts = SalaryReceipt::orderBy('year', 'desc')->orderBy('month', 'desc')->get();
			$salaryReceipts->load('employee', 'user');
			return SalaryReceiptResource::collection($salaryReceipts);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(StoreSalaryReceiptRequest $request, SalaryReceiptCreateService $service)
	{
		try {
			$employee = User::find($request->employee_id);
			$createdSalaryReceipt = $service->execute($request, $employee);
			$createdSalaryReceipt->load('employee', 'user');
			return response()->json(new SalaryReceiptResource($createdSalaryReceipt));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(SalaryReceipt $salaryReceipt)
	{
		try {
			$salaryReceipt->load('employee', 'user');
			return new SalaryReceiptResource($salaryReceipt);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(UpdateSalaryReceiptRequest $request, SalaryReceipt $salaryReceipt)
	{
		//
	}

	public function destroy(SalaryReceipt $salaryReceipt)
	{
		//
	}
}
