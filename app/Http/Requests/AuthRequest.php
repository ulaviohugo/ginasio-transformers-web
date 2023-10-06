<?php

namespace App\Http\Requests;

use App\Helpers\HttpResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class AuthRequest extends FormRequest
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
		return [
			'email' => 'required|email',
			'password' => 'required|string|min:6',
		];
	}

	public function failedValidation(Validator $validator)
	{
		throw new ValidationException(
			$validator,
			HttpResponse::error(message: $validator->errors()->first())
		);
	}
}
