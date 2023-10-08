<?php

namespace App\Http\Requests;

use App\Models\Customer;
use Illuminate\Validation\Rule;

class CustomerUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$id = request('customer');
		return [
			'name' => 'required',
			'email' => ['nullable', 'email', Rule::unique(Customer::class)->ignore($id)]
		];
	}
}
