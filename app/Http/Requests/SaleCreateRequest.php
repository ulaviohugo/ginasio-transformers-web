<?php

namespace App\Http\Requests;

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
			'name' => 'required',
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
			'payment_method' => 'required'
		];
	}
}
