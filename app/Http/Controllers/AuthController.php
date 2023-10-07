<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Helpers\HttpStatusCode;
use App\Http\Requests\AuthRequest;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
	public function login(AuthRequest $request): JsonResponse
	{
		$credentials = $request->validated();

		try {
			if (!$token = auth('api')->attempt($credentials)) {
				return HttpResponse::error(message: 'As credencias não conferem', status: HttpStatusCode::UNAUTHORIZED);
			} else {
				$user = auth('api')->user();
				if (!$user->can_login) {
					return HttpResponse::error(message: 'Não pode iniciar sessão de momento. Contacte um administrador.', status: HttpStatusCode::UNAUTHORIZED);
				}
				return HttpResponse::success(
					data: [
						...$this->respondWithToken($token),
						'user' => $user
					]
				);
			}
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao iniciar sessão. Tente novamente.' . $th->getMessage());
		}
	}

	public function me(): JsonResponse
	{
		return response()->json(auth('api')->user());
	}

	protected function respondWithToken($token)
	{
		return [
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth('api')->factory()->getTTL() * 60
		];
	}
}
