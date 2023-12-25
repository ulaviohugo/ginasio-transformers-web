<?php

namespace App\Services;

use App\Models\Refund;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RefundDeleteService
{
	public function  execute(Refund $justification)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $justification->file_path;
			$justification->delete();
			Storage::delete($pdfPath);
			DB::commit();
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir reembolso.' . $th->getMessage());
		}
	}
}
