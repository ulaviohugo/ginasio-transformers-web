<?php

namespace App\Services;

use App\Http\Requests\AdmissionCreateRequest;
use App\Models\Admission;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class AdmissionCreateService
{
	public function __construct(private AdmissionService $service)
	{
	}

	public function  execute(AdmissionCreateRequest $request)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);
			$admission = Admission::create([
				'employee_id' => $request->employee_id,
				'working_tools' => $request->working_tools,
				'clothes_production_training' => $request->clothes_production_training,
				'user_id' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($admission);
			$admission->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $admission;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao processar admissão.' . $th->getMessage());
		}
	}
}
