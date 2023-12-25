<?php

namespace App\Http\Requests;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Refund;
use App\Models\User;
use Illuminate\Validation\Rule;

class RefundUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return User::currentUser()->role == User::ROLE_ADMIN;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$id = request('refund');
		return [
			'customer_id' => [
				'required', 'gt:0', 'exists:' . Customer::class . ',id',
				Rule::unique(Refund::class)->ignore($id)->where(function ($query) {
					$query->whereDate('purchase_date', date('Y-m-d', strtotime(request('purchase_date'))))
						->where('product_id', date('Y-m-d', strtotime(request('product_id'))));
				})
			],
			'category_id' => 'required|gt:0|exists:' . Category::class . ',id',
			'product_id' => 'required|gt:0|exists:' . Product::class . ',id',
			'iban' => 'required|min:21',
			'amount' => 'required|gt:0'
		];
	}

	public function messages()
	{
		$customer = Customer::find(request('customer_id'));
		$treatment = $customer?->gender == 'Masculino' ? 'O' : ($customer?->gender == 'Feminino' ? 'A' : 'O(a)');
		return ['customer_id.unique' => "$treatment cliente $customer?->name já tem reembolso para esta data"];
	}
}
