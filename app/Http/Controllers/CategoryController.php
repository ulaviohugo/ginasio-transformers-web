<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

	public function index()
	{
		return Category::all();
	}


	public function store(Request $request)
	{
		//
	}


	public function show(string $id)
	{
		//
	}


	public function update(Request $request, string $id)
	{
		//
	}

	public function count()
	{
		return HttpResponse::success(data: Category::count());
	}

	public function destroy(string $id)
	{
		//
	}
}
