<?php
	$fileHelper =App\Helpers\FileHelper::class; 

	$logoPath = $fileHelper::logoPath();
	$logo = $fileHelper::convertToBase64($logoPath);
?>
<img src="{{$logo}}" style="width: 100px" alt="">