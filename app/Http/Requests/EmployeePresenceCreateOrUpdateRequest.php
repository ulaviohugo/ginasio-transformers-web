<?php

namespace App\Http\Requests;

use App\Models\EmployeePresence;
use App\Models\User;
use Illuminate\Validation\Rule;

class EmployeePresenceCreateOrUpdateRequest extends GlobalFormRequest
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
		$date = date('Y-m-d');
		$present = EmployeePresence::PRESENT;
		return [
			'employee_id' => [
				'required',
				'numeric', 'gt:0',
				Rule::exists(User::class, 'id'),
			],
			'presence_status' => 'required',
			'date' => 'required|date|before_or_equal:' . $date,
			'entry_time' => "nullable|required_if:presence_status,{$present}|date_format:H:i",
			'exit_time' => "nullable|required_if:presence_status,{$present}|date_format:H:i|after:entry_time",
		];
	}

	public function messages()
	{
		return [
			'entry_time.required_if' => 'Hora de entrada é obrigatória',
			'exit_time.required_if' => 'Hora de saída é obrigatória',
		];
	}
}
