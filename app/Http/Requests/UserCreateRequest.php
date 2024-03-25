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
			'email' => 'nullable|email|unique:' . DBHelper::TB_USERS.',email',
			'gender' => 'required',
			'gym_id' => [
				'nullable',
				Rule::requiredIf(function ()  {
					return request('role') != User::ROLE_ADMIN;
				})
			],
			'date_of_birth' => 'nullable|date',
			'marital_status' => 'nullable',
			'document_type' => 'required|string',
			'document_number' => [
				'required',
				Rule::unique(User::class, 'document_number')->where(function ($query) use ($document_type, $document_number) {
					$query->where('document_type', $document_type)
						->where('document_number', $document_number);
				})
			],
			'nif' => 'required|unique:' . DBHelper::TB_USERS.',nif',
			'social_security' => 'nullable|unique:' . DBHelper::TB_USERS.',social_security',
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
			'base_salary' => 'nullable|numeric',
			'hire_date' => 'required|date',
			'contract_end_date' => 'required|date',
			'iban' => 'nullable|unique:' . DBHelper::TB_USERS.',iban',
			'can_login' => 'nullable|boolean',
			'role' => [
				'nullable',
				Rule::requiredIf(function () use ($canLogin) {
					return $canLogin;
				})
			],
			'user_name' => 'nullable|unique:' . DBHelper::TB_USERS.',user_name',
			'password' => [
				'nullable',
				Rule::requiredIf(function () use ($canLogin) {
					return $canLogin;
				})
			],
		];
	}
}
