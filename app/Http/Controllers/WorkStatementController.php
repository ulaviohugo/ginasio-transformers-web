<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\WorkStatementCreateRequest;
use App\Http\Requests\WorkStatementUpdateRequest;
use App\Http\Resources\WorkStatementResource;
use App\Models\WorkStatement;
use App\Services\WorkStatementCreateService;
use App\Services\WorkStatementDeleteService;
use App\Services\WorkStatementUpdateService;

class WorkStatementController extends Controller
{
	public function index()
	{
		try {
			$workStatements = WorkStatement::orderBy('created_at', 'desc')
				->get();
			$workStatements->load('employee', 'user');
			return WorkStatementResource::collection($workStatements);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function store(WorkStatementCreateRequest $request, WorkStatementCreateService $service)
	{
		try {
			$createdWorkStatement = $service->execute($request);
			$createdWorkStatement->load('employee', 'user');
			return response()->json(new WorkStatementResource($createdWorkStatement));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function show(WorkStatement $workStatement)
	{
		try {
			$workStatement->load('employee', 'user');
			return new WorkStatementResource($workStatement);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function update(WorkStatementUpdateRequest $request, WorkStatementUpdateService $service, WorkStatement $workStatement)
	{
		try {
			$updatedWorkStatement = $service->execute($request,  $workStatement);
			$updatedWorkStatement->load('employee', 'user');
			return response()->json(new WorkStatementResource($updatedWorkStatement));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}

	public function destroy(WorkStatementDeleteService $service, WorkStatement $workStatement)
	{
		try {
			$service->execute($workStatement);
			return HttpResponse::success();
		} catch (\Throwable $th) {
			return HttpResponse::error(message: $th->getMessage());
		}
	}
}
