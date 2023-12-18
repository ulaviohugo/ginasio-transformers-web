<?php

namespace App\Http\Requests;

use App\Models\User;

class WorkStatementUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
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
			'employee_id' => 'required|gt:0|exists:' . User::class . ',id',
			'purpose' => 'required|string'
		];
	}
}
