<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Category;
use App\Models\User;
use Illuminate\Validation\Rule;

class CategoryUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		$this->failedAuthMessage = 'Não tem permissão de alterar categoria';
		return auth('api')->user()->role == User::ROLE_ADMIN;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$id = request('category');
		return [
			'name' => [
				'required',
				Rule::unique(Category::class)->ignore($id),
			],
		];
	}
}
