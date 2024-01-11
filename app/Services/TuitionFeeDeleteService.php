<?php

namespace App\Services;

use App\Models\TuitionFee;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TuitionFeeDeleteService
{
	public function  execute(TuitionFee $tuitionFee)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $tuitionFee->file_path;
			$tuitionFee->delete();
			Storage::delete($pdfPath);
			DB::commit();
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir mensalidade.' . $th->getMessage());
		}
	}
}
