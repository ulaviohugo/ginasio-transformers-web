<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\AbsenceJustificationCreateRequest;
use App\Http\Requests\AbsenceJustificationUpdateRequest;
use App\Http\Resources\AbsenceJustificationResource;
use App\Models\AbsenceJustification;
use App\Services\AbsenceJustificationCreateService;
use App\Services\AbsenceJustificationDeleteService;
use App\Services\AbsenceJustificationUpdateService;

class AbsenceJustificationController extends Controller
{
	public function index()
	{
		try {
			$justifications = AbsenceJustification::orderBy('id', 'desc')
				->get();
			$justifications->load('employee', 'user');
			return AbsenceJustificationResource::collection($justifications);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(AbsenceJustificationCreateRequest $request, AbsenceJustificationCreateService $service)
	{
		try {
			$createdJustification = $service->execute($request);
			$createdJustification->load('employee', 'user');
			return response()->json(new AbsenceJustificationResource($createdJustification));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(AbsenceJustification $absenceJustification)
	{
		try {
			$absenceJustification->load('employee', 'user');
			return new AbsenceJustificationResource($absenceJustification);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(AbsenceJustificationUpdateRequest $request, AbsenceJustificationUpdateService $service, AbsenceJustification $absenceJustification)
	{
		try {
			$updateJustification = $service->execute($request,  $absenceJustification);
			$updateJustification->load('employee', 'user');
			return response()->json(new AbsenceJustificationResource($updateJustification));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function destroy(AbsenceJustificationDeleteService $service, AbsenceJustification $absenceJustification)
	{
		try {
			$service->execute($absenceJustification);
			return HttpResponse::success(message: 'Registo excluído com sucesso');
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
