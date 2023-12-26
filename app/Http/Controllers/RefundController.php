<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\RefundCreateRequest;
use App\Http\Requests\RefundUpdateRequest;
use App\Http\Resources\RefundResource;
use App\Models\Refund;
use App\Services\RefundCreateService;
use App\Services\RefundDeleteService;
use App\Services\RefundUpdateService;

class RefundController extends Controller
{
	public function index()
	{
		try {
			$refunds = Refund::orderBy('id', 'desc')
				->get();
			$refunds->load(['customer', 'category', 'product' => function ($query) {
				$query->select('id', 'name');
			}, 'user']);
			return RefundResource::collection($refunds);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(RefundCreateRequest $request, RefundCreateService $service)
	{
		try {
			$createdRefund = $service->execute($request);
			$createdRefund->load(['customer', 'category', 'product' => function ($query) {
				$query->select('id', 'name');
			}, 'user']);
			return response()->json(new RefundResource($createdRefund));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(Refund $refund)
	{
		try {
			$refund->load(['customer', 'category', 'product' => function ($query) {
				$query->select('id', 'name');
			}, 'user']);
			return new RefundResource($refund);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(RefundUpdateRequest $request, RefundUpdateService $service, Refund $refund)
	{
		try {
			$updateRefund = $service->execute($request,  $refund);
			$updateRefund->load(['customer', 'category', 'product' => function ($query) {
				$query->select('id', 'name');
			}, 'user']);
			return response()->json(new RefundResource($updateRefund));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function destroy(RefundDeleteService $service, Refund $refund)
	{
		try {
			$service->execute($refund);
			return HttpResponse::success(message: 'Registo excluído com sucesso');
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
