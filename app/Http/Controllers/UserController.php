<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserCreateService;
use App\Services\UserUpdateService;

class UserController extends Controller
{
	public function index()
	{
		try {
			return UserResource::collection(User::all());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar funcionarios');
		}
	}

	public function store(UserCreateRequest $request, UserCreateService $service)
	{
		try {
			$createdUser = $service->execute($request);
			return new UserResource($createdUser);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar funcionário' . $th->getMessage());
		}
	}

	public function update(UserUpdateRequest $request, UserUpdateService $service, $id)
	{
		try {
			$updatedUser = $service->execute($request, User::find($id));
			return new UserResource($updatedUser);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar funcionário' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			return HttpResponse::success(data: User::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar funcionário');
		}
	}

	public function destroy($id)
	{
		try {
			$user = User::find($id);

			if (!$user) {
				return HttpResponse::error(message: 'Recurso não encontrado');
			}
			$this->authorize('delete', $user);
			if (User::currentUserId() == $user->id) {
				return HttpResponse::error(message: 'Não pode excluir a sua conta');
			}
			$user->delete();
			return HttpResponse::success(message: 'Funcionário excluído com sucesso');
		} catch (\Throwable $th) {
			return ErrorHandler::handle(
				exception: $th,
				message: 'Erro ao excluir funcionário' . $th->getMessage(),
				messagePermission: 'Não tem permissão para excluir este recurso',
			);
		}
	}
}
