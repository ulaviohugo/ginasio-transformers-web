<?php

namespace App\Exceptions;

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
	/**
	 * The list of the inputs that are never flashed to the session on validation exceptions.
	 *
	 * @var array<int, string>
	 */
	protected $dontFlash = [
		'current_password',
		'password',
		'password_confirmation',
	];

	/**
	 * Register the exception handling callbacks for the application.
	 */
	public function register(): void
	{
		$this->reportable(function (Throwable $e) {
			//
		});

		$this->renderable(function (Throwable $e, Request $request) {
			if ($e instanceof NotFoundHttpException) {
				if ($request->is('api/*')) {
					return HttpResponse::error(message: 'Registo não encontrado.', status: HttpStatusCode::NOT_FOUND);
				}
			}
		});
	}
}
