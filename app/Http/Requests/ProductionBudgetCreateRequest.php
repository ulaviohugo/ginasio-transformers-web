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
			'photo' => 'required',
			'customer_id' => 'required|numeric|gt:0|exists:' . $db::TB_CUSTOMERS . ',id',
			'end_product' => 'required',
			'date' => 'required|date',
			'cutting_employee_id' => 'required|numeric|gt:0|exists:' . $db::TB_USERS . ',id',
			'cutting_duration_per_minute' => 'required|numeric|gt:0',
			'cutting_cost' => 'required|numeric|gt:0',
			'sewing_employee_id' => 'required|numeric|gt:0|exists:' . $db::TB_USERS . ',id',
			'sewing_duration_per_minute' => 'required|numeric|gt:0',
			'sewing_cost' => 'required|numeric|gt:0',

			'production_fabrics' => 'required|array',
			'production_fabrics.*.fabric_id' => 'required|numeric|gt:0|exists:' . $db::TB_FABRICS . ',id',
			'production_fabrics.*.color' => 'required',
			'production_fabrics.*.meters' => 'required|numeric|gt:0',
			'production_fabrics.*.cost' => 'required|numeric|gt:0',

			'production_accessories' => 'required|array',
			'production_accessories.*.accessory_id' => 'required|numeric|gt:0|exists:' . $db::TB_ACCESSORIES . ',id',
			'production_accessories.*.quantity' => 'required|numeric|gt:0',
			'production_accessories.*.price' => 'required|numeric|gt:0',

			'variable_cost' => 'required|numeric|gt:0',
			'finishing_cost' => 'required|numeric|gt:0',
			'production_cost' => 'required|numeric|gt:0',
			'selling_cost' => 'required|numeric|gt:0',
			'discount' => 'nullable|numeric|gt:0',
			'total_to_pay' => 'required|numeric|gt:0',
		];
	}

	public function messages()
	{
		return [
			'production_fabrics.required' => 'Adicione pelo menos um tecido',
			'production_fabrics.*.fabric_id.required' => 'Cada tecido na lista deve ter um identificador',
			'production_fabrics.*.fabric_id.numeric' => 'Cada identificador do tecido deve ser um valor numérico',
			'production_fabrics.*.fabric_id.gt' => 'Cada identificador do tecido deve ser um valor maior que 0',
			'production_fabrics.*.fabric_id.exists' => 'Informou um tecido inválido',
			'production_fabrics.*.color.required' => 'Cada tecido na lista deve ter uma cor',
			'production_fabrics.*.meters.required' => 'Cada tecido na lista deve ter uma medida em metro',
			'production_fabrics.*.meters.numeric' => 'Cada metro do tecido na liste deve ser um valor numérico',
			'production_fabrics.*.meters.gt' => 'Cada metro do tecido na liste deve ser um valor maior que 0',
			'production_fabrics.*.cost.required' => 'Cada tecido na lista deve ter um custo',
			'production_fabrics.*.cost.numeric' => 'O custo de cada tecido na lista deve ser um valor numérico',
			'production_fabrics.*.cost.gt' => 'O custo de cada tecido na lista deve ser um valor maior que 0',

			'production_accessories.required' => 'Adicione pelo menos um acessório',
			'production_accessories.*.accessory_id.required' => 'Cada acessório na lista deve ter um identificador',
			'production_accessories.*.accessory_id.numeric' => 'Cada identificador do acessório na lista deve ser um valor numérico',
			'production_accessories.*.accessory_id.gt' => 'Cada identificador do acessório deve ser um valor maior que 0',
			'production_accessories.*.accessory_id.exists' => 'Informou um acessório inválido',
			'production_accessories.*.quantity.required' => 'Cada acessório na lista deve ter uma quantidade',
			'production_accessories.*.quantity.numeric' => 'A quantidade de cada acessório na liste deve ser um valor numérico',
			'production_accessories.*.quantity.gt' => 'A quantidade de cada acessório na lista deve ser um valor maior que 0',
			'production_accessories.*.price.required' => 'Cada acessório na lista deve ter um preço',
			'production_accessories.*.price.numeric' => 'O preço de cada acessório na lista deve ser um valor numérico',
			'production_accessories.*.price.gt' => 'O preço de cada acessório na lista deve ser um valor maior que 0',
		];
	}
}
