<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\AdmissionCreateRequest;
use App\Http\Requests\AdmissionUpdateRequest;
use App\Http\Resources\AdmissionResource;
use App\Models\Admission;
use App\Services\AdmissionCreateService;
use App\Services\AdmissionDeleteService;
use App\Services\AdmissionUpdateService;

class AdmissionController extends Controller
{
	public function index()
	{
		try {
			$admissions = Admission::orderBy('id', 'desc')
				->get();
			$admissions->load('employee', 'user');
			return AdmissionResource::collection($admissions);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(AdmissionCreateRequest $request, AdmissionCreateService $service)
	{
		try {
			$createdAdmission = $service->execute($request);
			$createdAdmission->load('employee', 'user');
			return response()->json(new AdmissionResource($createdAdmission));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(Admission $admission)
	{
		try {
			$admission->load('employee', 'user');
			return new AdmissionResource($admission);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(AdmissionUpdateRequest $request, AdmissionUpdateService $service, Admission $admission)
	{
		try {
			$updatedAdmission = $service->execute($request,  $admission);
			$updatedAdmission->load('employee', 'user');
			return response()->json(new AdmissionResource($updatedAdmission));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function destroy(AdmissionDeleteService $service, Admission $admission)
	{
		try {
			$service->execute($admission);
			return HttpResponse::success(message: 'Registo excluído com sucesso');
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
