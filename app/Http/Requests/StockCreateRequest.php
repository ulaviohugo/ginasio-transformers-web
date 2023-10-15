<?php

namespace App\Http\Requests;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Validation\Rule;

class StockCreateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de criar estoque';
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
			'supplier_id' => [
				'required',
				'numeric',
				'gt:0',
				Rule::exists(Supplier::class, 'id'),
			],
			'category_id' => [
				'required',
				'numeric',
				'gt:0',
				Rule::exists(Category::class, 'id'),
			],
			'product_id' => [
				'required',
				'numeric',
				'gt:0',
				Rule::exists(Product::class, 'id'),
			],
			// 'employee_id' =>  [
			// 	'required',
			// 	'numeric',
			// 	'gt:0',
			// 	Rule::exists(User::class, 'id'),
			// ],
			'payment_method' => 'required',
			'purchase_date' => 'required|date',
			'due_date' => 'nullable|date',
			'selling_price_unit' => 'required|numeric',
			'unit_price' => 'required|numeric|gt:0',
			'quantity' => 'required|numeric|gt:0',
		];
	}
}
