<?php

namespace App\Services;

use App\Http\Requests\AdmissionUpdateRequest;
use App\Models\Admission;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class AdmissionUpdateService
{
	public function __construct(private AdmissionService $service)
	{
	}

	public function  execute(AdmissionUpdateRequest $request, Admission $admission)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);
			$admission->update([
				'employee_id' => $request->employee_id,
				'working_tools' => $request->working_tools,
				'clothes_production_training' => $request->clothes_production_training,
				'user_id_update' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($admission);
			$admission->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $admission;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao alterar admissão.' . $th->getMessage());
		}
	}
}
