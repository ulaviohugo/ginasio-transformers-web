<?php

namespace App\Services;

use App\Models\Admission;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdmissionDeleteService
{
	public function  execute(Admission $workStatement)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $workStatement->file_path;
			$workStatement->delete();
			Storage::delete($pdfPath);
			DB::commit();
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir declaração.' . $th->getMessage());
		}
	}
}
