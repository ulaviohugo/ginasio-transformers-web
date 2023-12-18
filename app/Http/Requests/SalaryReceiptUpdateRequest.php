<?php

namespace App\Http\Requests;

use App\Helpers\DateHelper;
use App\Models\SalaryReceipt;
use App\Models\User;
use Illuminate\Validation\Rule;

class SalaryReceiptUpdateRequest extends GlobalFormRequest
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
		$salaryReceipt = request('salary_receipt');
		$id = $salaryReceipt->id;
		return [
			'employee_id' => 'required|gt:0|exists:' . User::class . ',id',
			'year' => 'required|gt:2000',
			'month' => ['required', 'gte:1', 'lte:12', Rule::unique(SalaryReceipt::class)->ignore($id)->where(function ($query) {
				$query->where('employee_id', request('employee_id'))
					->where('year', request('year'));
			})],
			'work_days' => 'required|numeric',

		];
	}

	public function messages()
	{
		$employeeName = User::find(request('employee_id'))?->name;
		$month = DateHelper::months[request('month')] ?? '';
		return [
			'month.unique' => 'Já tem um registo de salário de ' . $employeeName . ' em ' . $month . ' de ' . request('year')
		];
	}
}
