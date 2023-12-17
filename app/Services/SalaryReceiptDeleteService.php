<?php

namespace App\Services;

use App\Models\SalaryReceipt;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SalaryReceiptDeleteService
{

	public function  execute(SalaryReceipt $salaryReceipt)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $salaryReceipt->file_path;
			$salaryReceipt->delete();
			Storage::delete($pdfPath);
			DB::commit();
			return $salaryReceipt;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir processamento de salário.' . $th->getMessage());
		}
	}
}
