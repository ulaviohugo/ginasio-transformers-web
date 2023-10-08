<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Models\Country;
use App\Models\Municipality;
use App\Models\Province;

class LocationController extends Controller
{
	public function index()
	{
		try {
			return HttpResponse::success(data: [
				'countries' => Country::all(),
				'provinces' => Province::all(),
				'municipalities' => Municipality::all(),
			]);
		} catch (\Throwable $th) {
			HttpResponse::error(message: 'Erro ao consultar locais');
		}
	}
}
