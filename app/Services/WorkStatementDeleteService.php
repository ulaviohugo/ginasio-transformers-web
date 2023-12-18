<?php

namespace App\Services;

use App\Models\WorkStatement;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class WorkStatementDeleteService
{
	public function  execute(WorkStatement $workStatement)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $workStatement->file_path;
			$workStatement->delete();
			Storage::delete($pdfPath);
			DB::commit();
			return $workStatement;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir declaração.' . $th->getMessage());
		}
	}
}
