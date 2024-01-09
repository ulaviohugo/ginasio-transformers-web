<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\AthleteCreateRequest;
use App\Http\Requests\AthleteUpdateRequest;
use App\Http\Resources\AthleteResource;
use App\Models\Athlete;
use App\Services\AthleteCreateService;
use App\Services\AthleteDeleteService;
use App\Services\AthleteUpdateService;

class AthleteController extends Controller
{
	public function index()
	{
		try {
			$athletes = Athlete::orderBy('id', 'desc')
				->get();
			$athletes->load('user');
			return AthleteResource::collection($athletes);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(AthleteCreateRequest $request, AthleteCreateService $service)
	{
		try {
			$createdAthlete = $service->execute($request);
			$createdAthlete->load('user');
			return response()->json(new AthleteResource($createdAthlete));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(Athlete $athlete)
	{
		try {
			$athlete->load('user');
			return new AthleteResource($athlete);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(AthleteUpdateRequest $request, AthleteUpdateService $service, Athlete $athlete)
	{
		try {
			$updatedAthlete = $service->execute($request,  $athlete);
			$updatedAthlete->load('user');
			return response()->json(new AthleteResource($updatedAthlete));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function destroy(AthleteDeleteService $service, Athlete $athlete)
	{
		try {
			$service->execute($athlete);
			return HttpResponse::success(message: 'Registo excluído com sucesso');
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
