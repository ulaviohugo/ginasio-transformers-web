<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserCreateService;
use App\Services\UserLoadAllService;
use App\Services\UserUpdateService;
use Barryvdh\DomPDF\Facade\Pdf;

class UserController extends Controller
{
	public function index()
	{
		try {
			$user = User::currentUser();
			$isAdmin = $user->gym_id == null;
			if (!$isAdmin) {
				return UserResource::collection(User::where('gym_id', $user->gym_id)->get());
			} else {
				return UserResource::collection(User::all());
			}
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar funcionarios');
		}
	}

	public function gerarPDF(UserLoadAllService $service){
		try {
			$users = $service->execute();
			$pdf = Pdf::loadView('pdfs.employees', ['users' => $users]);
			return $pdf->stream();
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
			$user = User::currentUser();
			$isAdmin = $user->gym_id == null;
		
			if (!$isAdmin) {
				return HttpResponse::success(data: User::where('gym_id', $user->gym_id)->count());
			} else {
				return HttpResponse::success(data: User::count());
			}
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar funcionários');
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
