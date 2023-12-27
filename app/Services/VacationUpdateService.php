<?php

namespace App\Services;

use App\Http\Requests\VacationUpdateRequest;
use App\Models\Vacation;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class VacationUpdateService
{
	public function __construct(private VacationService $service)
	{
	}

	public function  execute(VacationUpdateRequest $request, Vacation $vacation)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);
			$vacation->update([
				'employee_id' => $request->employee_id,
				'starts_at' => $request->starts_at,
				'ends_at' => $request->ends_at,
				'spent_days' => $request->spent_days,
				'desired_days' => $request->desired_days,
				'missing_days' => $request->missing_days,
				'paid_vacation' => $request->paid_vacation,
				'user_id_update' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($vacation);
			$vacation->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $vacation;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao alterar pedido de férias.' . $th->getMessage());
		}
	}
}
