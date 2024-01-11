<?php

namespace App\Services;

use App\Http\Requests\TuitionFeeUpdateRequest;
use App\Models\TuitionFee;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class TuitionFeeUpdateService
{
	public function __construct(private TuitionFeeService $service)
	{
	}

	public function  execute(TuitionFeeUpdateRequest $request, TuitionFee $athlete)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);

			$athlete->update([
				'athlete_id' => $request->athlete_id,
				'year' => $request->year,
				'month' => $request->month,
				'amount' => $request->amount,
				'fine' => $request->fine,
				'user_id' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($athlete);
			$athlete->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $athlete;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao alterar atleta.' . $th->getMessage());
		}
	}
}
