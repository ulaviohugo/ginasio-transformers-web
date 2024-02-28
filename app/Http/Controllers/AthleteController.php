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
use App\Services\AthleteLoadAllService;
use App\Services\AthleteUpdateService;
use Barryvdh\DomPDF\Facade\Pdf;

class AthleteController extends Controller
{
	public function index(AthleteLoadAllService $service)
	{
		try {
			$athletes = $service->execute();
			$athletes->load('mensalidades');
			return AthleteResource::collection($athletes);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function gerarPDF(AthleteLoadAllService $service){
		try {
			$athletes = $service->execute();
			$athletes->load('mensalidades');

			$pdf = Pdf::loadView('pdfs.atletas', ['athletes' => $athletes]);
			return $pdf->stream();
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
