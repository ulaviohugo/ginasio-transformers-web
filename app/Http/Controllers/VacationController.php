<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\VacationCreateRequest;
use App\Http\Requests\VacationUpdateRequest;
use App\Http\Resources\VacationResource;
use App\Models\Vacation;
use App\Services\VacationCreateService;
use App\Services\VacationDeleteService;
use App\Services\VacationUpdateService;

class VacationController extends Controller
{
	public function index()
	{
		try {
			$vacations = Vacation::orderBy('id', 'desc')
				->get();
			$vacations->load('employee', 'user');
			return VacationResource::collection($vacations);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(VacationCreateRequest $request, VacationCreateService $service)
	{
		try {
			$createdVacation = $service->execute($request);
			$createdVacation->load('employee', 'user');
			return response()->json(new VacationResource($createdVacation));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(Vacation $vacation)
	{
		try {
			$vacation->load('employee', 'user');
			return new VacationResource($vacation);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(VacationUpdateRequest $request, VacationUpdateService $service, Vacation $vacation)
	{
		try {
			$updatedVacation = $service->execute($request,  $vacation);
			$updatedVacation->load('employee', 'user');
			return response()->json(new VacationResource($updatedVacation));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function destroy(VacationDeleteService $service, Vacation $vacation)
	{
		try {
			$service->execute($vacation);
			return HttpResponse::success(message: 'Registo excluído com sucesso');
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
