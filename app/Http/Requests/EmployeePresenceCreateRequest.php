<?php

namespace App\Http\Requests;

use App\Models\EmployeePresence;
use App\Models\User;
use Illuminate\Validation\Rule;

class EmployeePresenceCreateRequest extends GlobalFormRequest
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
		$date = request('date');
		$employeeId = request('employee_id');
		return [
			'employee_id' => [
				'required',
				'numeric', 'gt:0',
				Rule::exists(User::class, 'id'),
				Rule::unique(EmployeePresence::class)->where(function ($query) use ($date, $employeeId) {
					$query->where('employee_id', $employeeId)
						->where('date', $date);
				})
			],
			'date' => 'required|date',
			'presence_status' => 'required'
		];
	}
}
