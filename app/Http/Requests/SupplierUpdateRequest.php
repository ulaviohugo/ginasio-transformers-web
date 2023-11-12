<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Country;
use App\Models\Municipality;
use App\Models\Province;
use App\Models\User;
use Illuminate\Validation\Rule;

class SupplierUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de actualizar fornecedor';
		return User::currentUser()->role == User::ROLE_ADMIN;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$id = request('supplier');
		return [
			'name' => 'required',
			'representative' => 'required',
			'email' => ['required', 'email', Rule::unique(DBHelper::TB_SUPPLIERS)->ignore($id)],
			'phone' => ['required', Rule::unique(DBHelper::TB_SUPPLIERS)->ignore($id)],
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
			'supplier_products' => 'required',
			'supplier_products.*.product_id' => 'required|exists:' . DBHelper::TB_PRODUCTS . ',id',
			'supplier_products.*.unit_price' => 'required|numeric|gt:0',
		];
	}

	public function messages()
	{
		return [
			'supplier_products.required' => 'Adicione pelo menos um produto na lista de produto.',
			'supplier_products.*.product_id.required' => 'Cada produto lista deve ter um identificador.',
			'supplier_products.*.product_id.numeric' => 'Cada identificador do produto deve ser um valor numérico.',
			'supplier_products.*.product_id.gt' => 'Cada identificador do produto deve ser um valor maior que 0.',
			'supplier_products.*.product_id.exists' => 'Informou um produto inválido.',
			'supplier_products.*.unit_price.required' => 'Cada produto lista deve ter um identificador.',
			'supplier_products.*.unit_price.numeric' => 'O preço de cada produto deve ser um valor numérico.',
			'supplier_products.*.unit_price.gt' => 'O preço de cada produto deve ser um valor maior que 0.',
			'supplier_products.*.unit_price.exists' => 'Informou um produto inválido.',
		];
	}
}
