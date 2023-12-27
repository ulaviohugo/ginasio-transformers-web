<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Country;
use App\Models\Municipality;
use App\Models\Province;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserCreateRequest extends GlobalFormRequest
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
		$document_type = request('document_type');
		$document_number = request('document_number');
		$canLogin = request('can_login') == true || request('can_login') == "true";

		return [
			'name' => 'required',
			'email' => 'required|email|unique:' . DBHelper::TB_USERS,
			'gender' => 'required',
			'date_of_birth' => 'required|date',
			'marital_status' => 'required',
			'document_type' => 'required|string',
			'document_number' => [
				'required',
				Rule::unique(User::class, 'document_number')->where(function ($query) use ($document_type, $document_number) {
					$query->where('document_type', $document_type)
						->where('document_number', $document_number);
				})
			],
			'nif' => 'required|unique:' . DBHelper::TB_USERS,
			'social_security' => 'required|unique:' . DBHelper::TB_USERS,
			'education_degree' => 'required',
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
			'department' => 'required',
			'position' => 'required',
			'base_salary' => 'required|numeric|gt:0',
			'hire_date' => 'required|date',
			'contract_end_date' => 'required|date',
			'bank_name' => 'required',
			'iban' => 'required',
			'account_number' => 'required',
			'can_login' => 'nullable|boolean',
			'role' => [
				'nullable',
				Rule::requiredIf(function () use ($canLogin) {
					return $canLogin;
				})
			],
			'user_name' => [
				'nullable',
				Rule::requiredIf(function () use ($canLogin) {
					return $canLogin;
				}),
				'unique:' . DBHelper::TB_USERS,
			],
			'password' => [
				'nullable',
				Rule::requiredIf(function () use ($canLogin) {
					return $canLogin;
				})
			],
		];
	}
}
