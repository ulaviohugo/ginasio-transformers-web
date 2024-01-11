<?php

namespace App\Services;

use App\Http\Requests\TuitionFeeCreateRequest;
use App\Models\TuitionFee;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class TuitionFeeCreateService
{
	public function __construct(private TuitionFeeService $service)
	{
	}

	public function  execute(TuitionFeeCreateRequest $request)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);

			$tuitionFee = TuitionFee::create([
				'athlete_id' => $request->athlete_id,
				'year' => $request->year,
				'month' => $request->month,
				'amount' => $request->amount,
				'fine' => $request->fine,
				'user_id' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($tuitionFee);
			$tuitionFee->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $tuitionFee;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao cadastrar mensalidade.' . $th->getMessage());
		}
	}
}
