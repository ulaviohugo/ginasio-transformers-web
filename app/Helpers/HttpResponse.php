<?php

namespace App\Helpers;

class HttpResponse
{
	static function error($message, $status = HttpStatusCode::BAD_REQUEST)
	{
		return response()->json(['message' => $message], $status);
	}

	static function success($data = null, string $message = null,  $status = HttpStatusCode::OK)
	{
		return response()->json(
			$data !== null ? $data : ($message ? ['message' => $message] : null),
			$status
		);
	}
}
