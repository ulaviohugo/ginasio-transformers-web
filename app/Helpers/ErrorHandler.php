<?php

namespace App\Helpers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Response;
use Throwable;

class ErrorHandler
{
	static function handle(Throwable $exception, $message, $messagePermission = 'Não tem permissão para ceder este recurso', $status = Response::HTTP_BAD_REQUEST)
	{
		if ($exception instanceof AuthorizationException) {
			return HttpResponse::error(message: $messagePermission, status: Response::HTTP_UNAUTHORIZED);
		}
		return HttpResponse::error(message: $message, status: $status);
	}
}
