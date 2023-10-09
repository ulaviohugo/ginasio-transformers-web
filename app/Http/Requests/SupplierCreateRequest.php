<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Country;
use App\Models\Municipality;
use App\Models\Province;
use App\Models\User;
use Illuminate\Validation\Rule;

class SupplierCreateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de criar fornecedor';
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
			'name' => 'required',
			'representative' => 'required',
			'email' => 'required|email|unique:' . DBHelper::TB_SUPPLIERS,
			'phone' => 'required',
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
			'supplier_products' => 'required|array',
			'supplier_products.*.product_id' => 'required|numeric|gt:0|exists:' . DBHelper::TB_PRODUCTS . ',id',
			'supplier_products.*.unit_price' => 'required|numeric|gt:0',
		];
	}

	public function messages()
	{
		return [
			'supplier_products.required' => 'Adicione pelo menos um produto na lista de produto.',
			'supplier_products.*.product_id.required' => 'Cada produto dever na lista deve ter um identificador.',
			'supplier_products.*.product_id.numeric' => 'Cada identificador do produto dever ser um valor numérico.',
			'supplier_products.*.product_id.gt' => 'Cada identificador do produto dever ser um valor maior que 0.',
			'supplier_products.*.product_id.exists' => 'Informou um produto inválido.',
			'supplier_products.*.unit_price.required' => 'Cada produto dever na lista deve ter um identificador.',
			'supplier_products.*.unit_price.numeric' => 'Cada identificador do produto dever ser um valor numérico.',
			'supplier_products.*.unit_price.gt' => 'Cada identificador do produto dever ser um valor maior que 0.',
			'supplier_products.*.unit_price.exists' => 'Informou um produto inválido.',
		];
	}
}
