<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\SalaryReceiptCreateRequest;
use App\Http\Requests\SalaryReceiptUpdateRequest;
use App\Http\Resources\SalaryReceiptResource;
use App\Models\SalaryReceipt;
use App\Models\User;
use App\Services\SalaryReceiptCreateService;
use App\Services\SalaryReceiptDeleteService;
use App\Services\SalaryReceiptUpdateService;

class SalaryReceiptController extends Controller
{
	public function index()
	{
		try {
			$salaryReceipts = SalaryReceipt::orderBy('year', 'desc')
				->orderBy('month', 'desc')
				->get();
			$salaryReceipts->load('employee', 'user');
			return SalaryReceiptResource::collection($salaryReceipts);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(SalaryReceiptCreateRequest $request, SalaryReceiptCreateService $service)
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

	public function update(SalaryReceiptUpdateRequest $request, SalaryReceiptUpdateService $service, SalaryReceipt $salaryReceipt)
	{
		try {
			$updatedSalaryReceipt = $service->execute($request,  $salaryReceipt);
			$updatedSalaryReceipt->load('employee', 'user');
			return response()->json(new SalaryReceiptResource($updatedSalaryReceipt));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function destroy(SalaryReceiptDeleteService $service, SalaryReceipt $salaryReceipt)
	{
		try {
			$service->execute($salaryReceipt);
			return HttpResponse::success();
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
