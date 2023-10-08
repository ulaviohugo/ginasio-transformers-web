<?php

namespace App\Helpers;

use Illuminate\Auth\Access\AuthorizationException;
use Throwable;

class ErrorHandler
{
	static function handle(Throwable $exception, $message, $messagePermission = 'Não tem permissão para ceder este recurso', $status = HttpStatusCode::BAD_REQUEST)
	{
		if ($exception instanceof AuthorizationException) {
			return HttpResponse::error(message: $messagePermission, status: HttpStatusCode::UNAUTHORIZED);
		}
		return HttpResponse::error(message: $message, status: $status);
	}
}
