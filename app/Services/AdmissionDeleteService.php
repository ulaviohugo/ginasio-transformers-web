<?php

namespace App\Services;

use App\Models\Admission;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdmissionDeleteService
{
	public function  execute(Admission $admission)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $admission->file_path;
			$admission->delete();
			Storage::delete($pdfPath);
			DB::commit();
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir declaração.' . $th->getMessage());
		}
	}
}
