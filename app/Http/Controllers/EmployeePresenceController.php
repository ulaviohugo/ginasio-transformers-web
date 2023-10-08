<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\EmployeePresenceCreateRequest;
use App\Http\Requests\EmployeePresenceUpdateRequest;
use App\Models\EmployeePresence;
use App\Models\User;

class EmployeePresenceController extends Controller
{
	public function index()
	{
		try {
			return EmployeePresence::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar presença');
		}
	}

	public function store(EmployeePresenceCreateRequest $request)
	{
		try {
			$createdEmployeePresence = EmployeePresence::create([
				'employee_id' => $request->employee_id,
				'date' => $request->date,
				'presence_status' => $request->presence_status,
				'description' => $request->description,
				'user_id' => User::currentUserId()
			]);
			return HttpResponse::success(data: $createdEmployeePresence);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar presença');
		}
	}

	public function update(EmployeePresenceUpdateRequest $request, EmployeePresence $employeePresence)
	{
		try {
			$employeePresence->employee_id = $request->employee_id;
			$employeePresence->date = $request->date;
			$employeePresence->presence_status = $request->presence_status;
			$employeePresence->description = $request->description;
			$employeePresence->user_id_update = User::currentUserId();
			$employeePresence->save();
			return HttpResponse::success(data: $employeePresence);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar presença');
		}
	}
}
