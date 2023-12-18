<?php

namespace App\Services;

use App\Http\Requests\WorkStatementCreateRequest;
use App\Models\WorkStatement;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class WorkStatementCreateService
{
	public function __construct(private WorkStatementService $service)
	{
	}

	public function  execute(WorkStatementCreateRequest $request)
	{
		try {
			DB::beginTransaction();

			$workStatement = WorkStatement::create([
				'employee_id' => $request->employee_id,
				'purpose' => $request->purpose,
				'user_id' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($workStatement);
			$workStatement->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $workStatement;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao processar declaração.' . $th->getMessage());
		}
	}
}
