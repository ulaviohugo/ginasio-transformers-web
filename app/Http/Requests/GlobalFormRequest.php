<?php

namespace App\Http\Requests;

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class GlobalFormRequest extends FormRequest
{
	protected $failedAuthMessage = 'Não tem permissão aceder este recurso';

	protected function failedValidation(Validator $validator)
	{
		throw new ValidationException(
			$validator,
			HttpResponse::error(message: $validator->errors()->first())
		);
	}

	protected function failedAuthorization()
	{
		return abort(HttpResponse::error(
			message: $this->failedAuthMessage,
			status: HttpStatusCode::UNAUTHORIZED
		));
	}
}
