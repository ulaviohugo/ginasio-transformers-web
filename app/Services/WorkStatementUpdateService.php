<?php

namespace App\Services;

use App\Http\Requests\WorkStatementUpdateRequest;
use App\Models\WorkStatement;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class WorkStatementUpdateService
{
	public function __construct(private WorkStatementService $service)
	{
	}

	public function  execute(WorkStatementUpdateRequest $request, WorkStatement $workStatement)
	{
		try {
			DB::beginTransaction();

			$workStatement->update([
				'employee_id' => $request->employee_id,
				'purpose' => $request->purpose,
				'user_id_update' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($workStatement);
			$workStatement->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $workStatement;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao alterar declaração.' . $th->getMessage());
		}
	}
}
