<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Http\Requests\AthleteCreateRequest;
use App\Models\Athlete;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class AthleteCreateService
{
	public function __construct(private AthleteService $service)
	{
	}

	public function  execute(AthleteCreateRequest $request)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);

			$photo = null;
			if (FileHelper::isUploadable($request->photo)) {
				$photo = FileHelper::uploadBase64($request->photo, 'uploads/athletes');
			}
			$athlete = Athlete::create([
				'name' => $request->name,
				'date_of_birth' => $request->date_of_birth,
				'gender' => $request->gender,
				'marital_status' => $request->marital_status,
				'document_type' => $request->document_type,
				'document_number' => $request->document_number,
				'photo' => $photo,
				'phone' => $request->phone,
				'phone2' => $request->phone2,
				'email' => $request->email,
				'observation' => $request->observation,
				'health_history' => $request->health_history,
				'education_degree' => $request->education_degree,
				'starting_weight' => $request->starting_weight,
				'current_weight' => $request->current_weight,
				'goal_weight' => $request->goal_weight,
				'status' => $request->status,
				'country_id' => $request->country_id,
				'province_id' => $request->province_id,
				'municipality_id' => $request->municipality_id,
				'address' => $request->address,
				'user_id' => User::currentUserId(),
			]);
			// $pdfUrl = $this->service->buildPDF($athlete);
			// $athlete->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $athlete;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao cadastrar atleta.' . $th->getMessage());
		}
	}
}
