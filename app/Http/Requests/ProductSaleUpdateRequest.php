<?php

namespace App\Http\Requests;

use App\Models\Category;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Validation\Rule;

class ProductSaleUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de criar produto';
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
			'category_id' => ['required', Rule::exists(Category::class, 'id')],
			'product_id' => ['required', Rule::exists(Product::class, 'id')],
			'sale_id' => ['required', Rule::exists(Sale::class, 'id')],
			// 'lot' => 'required',
			// 'bar_code' => 'required',
			'quantity' => 'required|gt:0',
			'total_value' => 'required|gt:0',
			'unit_price' => 'required|gt:0',
			// 'amount_paid' => 'required',
			// 'color' => 'required',
			// 'size' => 'required',
			// 'discount' => 'required',
			'employee_id' => ['required', Rule::exists(User::class, 'id')],
		];
	}
}
