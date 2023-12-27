<?php

namespace App\Services;

use App\Models\Vacation;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class VacationDeleteService
{
	public function  execute(Vacation $vacation)
	{
		try {
			DB::beginTransaction();
			$pdfPath = $vacation->file_path;
			$vacation->delete();
			Storage::delete($pdfPath);
			DB::commit();
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir pedido de férias.' . $th->getMessage());
		}
	}
}
