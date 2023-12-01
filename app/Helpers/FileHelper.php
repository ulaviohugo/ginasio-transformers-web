<?php

namespace App\Helpers;

use Exception;
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
		return public_path('/storage/' . $path);
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

	public static function convertToBase64(string $filePath)
	{
		try {
			if (!file_exists($filePath)) {
				throw new Exception("Arquivo não encontrado: $filePath");
			}

			$fileContent = file_get_contents($filePath);

			if ($fileContent === false) {
				throw new Exception("Erro ao ler o conteúdo do arquivo: $filePath");
			}

			$fileInfo = pathinfo($filePath);
			$fileExtension = $fileInfo['extension'];

			$fileBase64 = base64_encode($fileContent);

			if ($fileBase64 === false) {
				throw new Exception("Erro ao codificar o conteúdo em base64: $filePath");
			}

			return "data:$fileExtension;base64,$fileBase64";
		} catch (Exception $e) {
			return "Erro ao converter o arquivo para base64: " . $e->getMessage();
		}
	}

	public static function logoPath()
	{
		return public_path('/images/logo.png');
	}

	public static function logoUrl()
	{
		return asset('/images/logo.png');
	}
}
