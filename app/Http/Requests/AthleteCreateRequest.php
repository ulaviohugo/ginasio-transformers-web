<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Athlete;
use App\Models\Country;
use App\Models\Municipality;
use App\Models\Province;
use App\Models\User;
use Illuminate\Validation\Rule;

class AthleteCreateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de criar fornecedor';
		return User::currentUser()->role == User::ROLE_ADMIN;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'name' => 'required',
			'gender' => 'required',
			'height' => 'required',
			'gym_id' => 'required',
			'date_of_birth' => 'required|date',
			'marital_status' => 'required',
			'document_type' => 'required|string',
			'document_number' => [
				'required',
				Rule::unique(Athlete::class, 'document_number')->where(function ($query) {
					$query->where('document_type', request('document_type'))
						->where('document_number', request('document_number'));
				})
			],
			'email' => 'nullable|email|unique:' . DBHelper::TB_ATHLETE,
			'education_degree' => 'required',
			'starting_weight' => 'required|numeric|gt:0',
			'current_weight' => 'nullable|numeric|gt:0',
			'goal_weight' => 'nullable|numeric|gt:0',
			'phone' => 'required',
			'country_id' => [
				'nullable',
				'numeric',
				'gt:0',
				Rule::exists(Country::class, 'id'),
			],
			'province_id' => [
				'nullable',
				'numeric',
				'gt:0',
				Rule::exists(Province::class, 'id'),
			],
			'municipality_id' => [
				'nullable',
				'numeric',
				'gt:0',
				Rule::exists(Municipality::class, 'id'),
			],
			'address' => 'required',
		];
	}
}
