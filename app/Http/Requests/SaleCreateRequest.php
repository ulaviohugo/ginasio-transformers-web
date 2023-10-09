<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Validation\Rule;

class SaleCreateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de criar produto';
		return auth('api')->user()->role == User::ROLE_ADMIN;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'customer_id' => [
				'nullable',
				'numeric',
				'gt:0',
				Rule::exists(Customer::class, 'id'),
			],
			'total_value' => 'required|numeric|gt:0',
			'amount_paid' => 'required|numeric|gt:0',
			'discount' => 'nullable|numeric',
			'employee_id' =>  [
				'required',
				'numeric',
				'gt:0',
				Rule::exists(User::class, 'id'),
			],
			'payment_method' => 'required',
			'product_sales' => 'required|array',
			'product_sales.*.product_id' => 'required|numeric|gt:0|exists:' . DBHelper::TB_PRODUCTS . ',id',
			'product_sales.*.quantity' => 'required|numeric|gt:0',
			'product_sales.*.total_value' => 'required|numeric|gt:0',
			'product_sales.*.unit_price' => 'required|numeric|gt:0',
			'product_sales.*.amount_paid' => 'required|numeric|gt:0',
		];
	}

	public function messages()
	{
		return [
			'product_sales.required' => 'Adicione pelo menos um produto na lista de produto.',
			'product_sales.*.product_id.required' => 'Cada produto dever na lista deve ter um identificador.',
			'product_sales.*.product_id.numeric' => 'Cada identificador do produto dever ser um valor numérico.',
			'product_sales.*.product_id.gt' => 'Cada identificador do produto dever ser um valor maior que 0.',
			'product_sales.*.product_id.exists' => 'Informou um produto inválido.',
			'product_sales.*.quantity.required' => 'Informe cada quantidade do produto na lista .',
			'product_sales.*.quantity.numeric' => 'A quantidade de cada produto dever ser um valor numérico.',
			'product_sales.*.quantity.gt' => 'A quantidade de cada produto dever ser um valor maior que 0.',
			'product_sales.*.total_value.required' => 'Informe o valor total do produto na lista.',
			'product_sales.*.total_value.numeric' => 'O valor total de cada produto dever ser um valor numérico.',
			'product_sales.*.total_value.gt' => 'O valor total de cada produto dever ser um valor maior que 0.',
			'product_sales.*.unit_price.required' => 'Informe a preço unitário de cada produto na lista.',
			'product_sales.*.unit_price.numeric' => 'O preço unitário de cada produto dever ser um valor numérico.',
			'product_sales.*.unit_price.gt' => 'O preço unitário de cada produto dever ser um valor maior que 0.',
			'product_sales.*.amount_paid.required' => 'Informe a valor pago de cada produto na lista.',
			'product_sales.*.amount_paid.numeric' => 'O valor pago de cada produto dever ser um valor numérico.',
			'product_sales.*.amount_paid.gt' => 'O valor pago de cada produto dever ser um valor maior que 0.',
		];
	}
}
