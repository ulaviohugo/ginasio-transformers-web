<?php

namespace App\Services;

use App\Models\AbsenceJustification;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AbsenceJustificationDeleteService
{
	public function  execute(AbsenceJustification $justification)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $justification->file_path;
			$justification->delete();
			Storage::delete($pdfPath);
			DB::commit();
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir justificativo de falta.' . $th->getMessage());
		}
	}
}
