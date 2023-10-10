<?php

namespace App\Http\Requests;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Validation\Rule;

class TransactionCreateRequest extends GlobalFormRequest
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
			'date' => 'required|date',
			'operation_type' => 'required',
			'description' => 'required',
			'amount' => 'required|numeric|gt:0',
			'payment_method' => 'required',
		];
	}
}
