<?php

namespace App\Services;

use App\Http\Requests\VacationCreateRequest;
use App\Models\Vacation;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class VacationCreateService
{
	public function __construct(private VacationService $service)
	{
	}

	public function  execute(VacationCreateRequest $request)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);
			$vacation = Vacation::create([
				'employee_id' => $request->employee_id,
				'starts_at' => $request->starts_at,
				'ends_at' => $request->ends_at,
				'spent_days' => $request->spent_days,
				'desired_days' => $request->desired_days,
				'missing_days' => $request->missing_days,
				'paid_vacation' => $request->paid_vacation,
				'user_id' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($vacation);
			$vacation->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $vacation;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao processar pedido de férias.' . $th->getMessage());
		}
	}
}
