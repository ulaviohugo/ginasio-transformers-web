<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\TuitionFeeCreateRequest;
use App\Http\Requests\TuitionFeeUpdateRequest;
use App\Http\Resources\TuitionFeeResource;
use App\Models\TuitionFee;
use App\Services\TuitionFeeCreateService;
use App\Services\TuitionFeeDeleteService;
use App\Services\TuitionFeeLoadAllService;
use App\Services\TuitionFeeUpdateService;

class TuitionFeeController extends Controller
{
	public function index(TuitionFeeLoadAllService $service)
	{
		try {
			$tuitionFees = $service->execute();
			$tuitionFees->load('user');
			return TuitionFeeResource::collection($tuitionFees);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(TuitionFeeCreateRequest $request, TuitionFeeCreateService $service)
	{
		try {
			$createdTuitionFee = $service->execute($request);
			$createdTuitionFee->load('user');
			return response()->json(new TuitionFeeResource($createdTuitionFee));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(TuitionFee $tuitionFee)
	{
		try {
			$tuitionFee->load('user');
			return new TuitionFeeResource($tuitionFee);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(TuitionFeeUpdateRequest $request, TuitionFeeUpdateService $service, TuitionFee $tuitionFee)
	{
		try {
			$updatedTuitionFee = $service->execute($request,  $tuitionFee);
			$updatedTuitionFee->load('user');
			return response()->json(new TuitionFeeResource($updatedTuitionFee));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function count()
	{
		try {
			return HttpResponse::success(data: TuitionFee::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar atletas');
		}
	}

	public function destroy(TuitionFeeDeleteService $service, TuitionFee $tuitionFee)
	{
		try {
			$service->execute($tuitionFee);
			return HttpResponse::success(message: 'Registo excluído com sucesso');
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
