<?php

namespace App\Http\Requests;

use App\Models\Admission;
use App\Models\User;
use Illuminate\Validation\Rule;

class AdmissionUpdateRequest extends GlobalFormRequest
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
		$id = request('admission');
		return [
			'employee_id' => [
				'required', 'gt:0', 'exists:' . User::class . ',id',
				Rule::unique(Admission::class)->ignore($id)
			],
			'working_tools' => 'required|array',
			'clothes_production_training' => 'required|array'
		];
	}

	public function messages()
	{
		$employee = User::find(request('employee_id'));
		$treatment = $employee?->gender == 'Masculino' ? 'O' : ($employee?->gender == 'Feminino' ? 'A' : 'O(a)');
		$treatmentLower = strtolower($treatment);
		return ['employee_id.unique' => "$treatment funcionári{$treatmentLower} $employee?->name já tem o formulário de admissão"];
	}
}
