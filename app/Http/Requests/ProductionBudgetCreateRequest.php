<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\User;

class ProductionBudgetCreateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de criar orçamento';
		return User::currentUser()->role == User::ROLE_ADMIN;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$db = new DBHelper();
		return [
			'customer_id' => 'required|numeric|gt:0|exists:' . $db::TB_CUSTOMERS . ',id',
			'end_product' => 'required',
			'date' => 'required|date',
			'cutting_employee_id' => 'required|numeric|gt:0|exists:' . $db::TB_USERS . ',id',
			'cutting_cost' => 'required|numeric|gt:0',
			'cutting_duration_per_minute' => 'required|numeric|gt:0',
			'sewing_employee_id' => 'required|numeric|gt:0|exists:' . $db::TB_USERS . ',id',
			'sewing_cost' => 'required|numeric|gt:0',
			'sewing_duration_per_minute' => 'required|numeric|gt:0',
			'variable_cost' => 'required|numeric|gt:0',
			'finishing_cost' => 'required|numeric|gt:0',
			'production_cost' => 'required|numeric|gt:0',
			'selling_cost' => 'required|numeric|gt:0',
			'discount' => 'nullable|numeric|gt:0',
			'total_to_pay' => 'required|numeric|gt:0',

			'production_fabrics' => 'required|array',
			'production_fabrics.*.fabric_id' => 'required|numeric|gt:0|exists:' . $db::TB_FABRICS . ',id',
			'production_fabrics.*.color' => 'required',
			'production_fabrics.*.meters' => 'required|numeric|gt:0',
			'production_fabrics.*.cost' => 'required|numeric|gt:0',

			'production_accessories' => 'required|array',
			'production_accessories.*.accessory_id' => 'required|numeric|gt:0|exists:' . $db::TB_ACCESSORIES . ',id',
			'production_accessories.*.quantity' => 'required|numeric|gt:0',
			'production_accessories.*.price' => 'required|numeric|gt:0',
		];
	}
}
