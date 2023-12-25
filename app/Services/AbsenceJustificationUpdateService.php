<?php

namespace App\Services;

use App\Http\Requests\AbsenceJustificationUpdateRequest;
use App\Models\AbsenceJustification;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class AbsenceJustificationUpdateService
{
	public function __construct(private AbsenceJustificationService $service)
	{
	}

	public function  execute(AbsenceJustificationUpdateRequest $request, AbsenceJustification $justification)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);
			$justification->update([
				'employee_id' => $request->employee_id,
				'starts_at' => $request->starts_at,
				'ends_at' => $request->ends_at,
				'absent_days' => $request->absent_days,
				'absence_reason' => $request->absence_reason,
				'absence_description' => $request->absence_description,
				'adicional_information' => $request->adicional_information,
				'user_id_update' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($justification);
			$justification->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $justification;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao alterar justificativo de falta.' . $th->getMessage());
		}
	}
}
