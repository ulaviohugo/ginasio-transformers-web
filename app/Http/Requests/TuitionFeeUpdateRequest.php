<?php

namespace App\Http\Requests;

use App\Models\Athlete;
use App\Models\TuitionFee;
use App\Models\User;
use Illuminate\Validation\Rule;

class TuitionFeeUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de alterar atleta';
		return User::currentUser()->role == User::ROLE_ADMIN;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$id = request('tuition_fee');
		$maxYear = date('Y') + 1;
		$minYear = date('Y') - 20;
		return [
			'athlete_id' => [
				'required', 'gt:0',
				Rule::exists(Athlete::class, 'id'),
				Rule::unique(TuitionFee::class)->ignore($id)->where(function ($query) {
					$query->where('year', request('year'))->where('month', request('month'));
				})
			],
			'year' => 'required|numeric|gt:' . $minYear . '|lt:' . $maxYear,
			'month' => 'required|numeric|gt:0|lt:13',
			'amount' => 'required||numeric|gt:0',
			'fine' => 'nullable|numeric|gt:0',
		];
	}
}
