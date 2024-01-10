<?php

namespace App\Http\Requests;

use App\Models\Vacation;
use App\Models\User;
use Illuminate\Validation\Rule;

class VacationUpdateRequest extends GlobalFormRequest
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
		$id = request('vacation');
		return [
			'employee_id' => [
				'required', 'gt:0', 'exists:' . User::class . ',id',
				Rule::unique(Vacation::class)->ignore($id)->where(function ($query) {
					$query->whereDate('starts_at', date('Y-m-d', strtotime(request('starts_at'))))
						->whereDate('ends_at', date('Y-m-d', strtotime(request('ends_at'))));
				})
			],
			'spent_days' => 'required|numeric',
			'missing_days' => 'required|numeric',
			'starts_at' => 'required|date',
			'ends_at' => 'required|date|after:starts_at',
		];
	}

	public function messages()
	{
		$employee = User::find(request('employee_id'));
		$treatment = $employee?->gender == 'Masculino' ? 'O' : ($employee?->gender == 'Feminino' ? 'A' : 'O(a)');
		$treatmentLower = strtolower($treatment);
		return ['employee_id.unique' => "$treatment funcionári{$treatmentLower} $employee?->name já tem férias marcada para esta data"];
	}
}