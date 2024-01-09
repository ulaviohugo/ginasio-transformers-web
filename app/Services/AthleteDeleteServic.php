<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Models\Athlete;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AthleteDeleteService
{
	public function  execute(Athlete $athlete)
	{
		try {
			DB::beginTransaction();
			$photo = $athlete->photo;
			$athlete->delete();

			if ($photo) {
				FileHelper::delete($photo);
			}
			DB::commit();
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao excluir atleta.' . $th->getMessage());
		}
	}
}
