<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthenticateApi
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 */
	public function handle(Request $request, Closure $next): Response
	{
		try {
			JWTAuth::parseToken()->authenticate();
		} catch (\Throwable $th) {
			$message = 'Informe o token.' . $th->getMessage();
			if ($th instanceof TokenInvalidException) {
				$message = 'Token inválido';
			} else if ($th instanceof TokenExpiredException) {
				$message = 'Token expirado. Inicie sessão';
			}
			return response()->json(['message' => $message], 401);
		}
		return $next($request);
	}
}
