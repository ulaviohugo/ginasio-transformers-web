<?php

namespace App\Http\Controllers;

use App\Helpers\HttpResponse;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
	public function index()
	{
		try {
			return Notification::all();
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao consultar categoria');
		}
	}
}
