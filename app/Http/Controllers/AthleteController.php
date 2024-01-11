<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Helpers\NumberHelper;
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
			$id = null;
			$name = null;
			$email = null;
			$phone = null;
			$date = null;

			if (request()->query('filter')) {
				$queryParam = json_decode(request()->query('filter'));
				$id = isset($queryParam->id) ? $queryParam->id : null;
				$name = isset($queryParam->name) ? $queryParam->name : null;
				$email = isset($queryParam->email) ? $queryParam->email : null;
				$phone = isset($queryParam->phone) ? $queryParam->phone : null;
				$date = isset($queryParam->date) ? date('Y-m-d', strtotime($queryParam->date)) : null;
			}

			$athletes = Athlete::orderBy('id', 'desc');

			if ($id) {
				$athletes = $athletes->where('id', $id);
			}
			if ($name) {
				$athletes = $athletes->where('name', 'LIKE', "{$name}%");
			}
			if ($email) {
				$athletes = $athletes->where('email', $email);
			}
			if ($phone) {
				$athletes = $athletes->where('phone', NumberHelper::convertToNumber($phone));
			}
			if ($date) {
				$athletes = $athletes->whereDate('created_at', $date);
			}

			$athletes = $athletes->get();
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

	public function count()
	{
		try {
			return HttpResponse::success(data: Athlete::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar atletas');
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
