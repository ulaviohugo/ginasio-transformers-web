<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\EmployeePresenceCreateOrUpdateRequest;
use App\Models\EmployeePresence;
use App\Models\User;

class EmployeePresenceController extends Controller
{
	public function index()
	{
		try {
			$employees = User::all();
			$employees->load('employee_presences');
			return $employees;
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar presença');
		}
	}

	public function store(EmployeePresenceCreateOrUpdateRequest $request)
	{
		try {
			$createdEmployeePresence = EmployeePresence::updateOrCreate(
				[
					'employee_id' => $request->employee_id,
					'date' => date('Y-m-d', strtotime($request->date)),
				],
				[
					'presence_status' => $request->presence_status,
					'entry_time' => $request->entry_time,
					'exit_time' => $request->exit_time,
					'delay_duration' => $request->delay_duration,
					'description' => $request->description,
					'user_id' => User::currentUserId()
				]
			);
			return HttpResponse::success(data: $createdEmployeePresence);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar presença' . $th->getMessage());
		}
	}
}
