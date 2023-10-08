<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Validation\Rule;

class ProductCreateRequest extends GlobalFormRequest
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
		$name = request('name');
		$categoryId = request('category_id');
		return [
			'name' => 'required',
			'category_id' => [
				'required',
				'numeric',
				'gt:0',
				Rule::exists(Category::class, 'id'),
				Rule::unique(Product::class)->where(function ($query) use ($name, $categoryId) {
					$query->where('name', $name)
						->where('category_id', $categoryId);
				})
			],
			'price' => 'required|numeric|gt:0',
		];
	}
}
