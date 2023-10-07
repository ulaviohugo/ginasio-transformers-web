<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;

class CategoryController extends Controller
{
	public function index()
	{
		try {
			$this->authorize('viewAny', Category::class);
			return Category::all();
		} catch (\Throwable $th) {
			if ($th instanceof AuthorizationException) {
				return HttpResponse::error(message: 'Não tem permissão para ceder este recurso');
			}
			return HttpResponse::error(message: 'Erro ao consultar categoria' . $th->getMessage());
		}
	}

	public function store(CategoryCreateRequest $request)
	{
		try {
			$createdCategory = Category::create([
				'name' => trim($request->name),
				'user_id' => User::currentUserId()
			]);
			return HttpResponse::success(data: $createdCategory);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar categoria' . $th->getMessage());
		}
	}

	public function update(CategoryUpdateRequest $request, Category $category)
	{
		try {
			$category->name = trim($request->name);
			$category->user_id_update = User::currentUserId();
			$category->save();
			return HttpResponse::success(data: $category);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar categoria' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			$this->authorize('viewAny', Category::class);
			return HttpResponse::success(data: Category::count());
		} catch (\Throwable $th) {
			if ($th instanceof AuthorizationException) {
				return HttpResponse::error(message: 'Não tem permissão para ceder este recurso');
			}
			return HttpResponse::error(message: 'Erro ao consultar categoria');
		}
	}

	public function destroy(Category $category)
	{
		try {
			$this->authorize('delete', Category::class);
			$category->delete();
			return HttpResponse::success(message: 'Categoria excluída com sucesso');
		} catch (\Throwable $th) {
			if ($th instanceof AuthorizationException) {
				return HttpResponse::error(message: 'Não tem permissão para excluir categoria');
			}
			return HttpResponse::error(message: 'Erro ao excluir categoria' . $th->getMessage());
		}
	}
}
