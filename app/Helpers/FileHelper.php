<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileHelper
{
	static function uploadBase64(string $base64, $path = '')
	{
		$extension = explode('/', explode(':', substr($base64, 0, strpos($base64, ';')))[1])[1];   // .jpg .png .pdf

		$replace = substr($base64, 0, strpos($base64, ',') + 1);

		// find substring fro replace here eg: data:image/png;base64,
		$image = str_replace($replace, '', $base64);
		$image = str_replace(' ', '+', $image);
		$imageName = Str::random(10) . '.' . $extension;
		$path .= "/$imageName";
		Storage::put($path, base64_decode($image));
		return $path;
	}

	static function storagePath($path = '')
	{
		return storage_path($path);
	}

	static function storageLink($file = '')
	{
		$link = $file ? "storage/$file" : "storage";
		return asset($link);
	}

	static function delete($file)
	{
		Storage::delete($file);
	}

	public static function isUploadable($data)
	{
		if (!$data) return false;
		try {
			$extension = explode('/', explode(':', substr($data, 0, strpos($data, ';')))[1])[1];
			return true;
		} catch (\Throwable $th) {
			return false;
		}
	}
}
