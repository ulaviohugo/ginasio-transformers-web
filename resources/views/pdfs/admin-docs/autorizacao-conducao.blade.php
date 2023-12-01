<?php
$fileHelper =App\Helpers\FileHelper::class; 

$logoPath = $fileHelper::logoPath();
$logo = $fileHelper::convertToBase64($logoPath);
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Autorização de condução - {{$employee->name}}</title>

	<style>
		* {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
		}

		body {
			padding: 8px
		}

		@page {
			/* size: 348px 216px; */
			padding: 0;
			margin: 0;
		}

		.page {
			max-width: 800px;
			margin: auto;
			padding: 32px;
		}
	</style>
</head>

<body>
	<div class="page">
		<img src="{{$logo}}" style="width: 200px" alt="">
		<div style="font-size: 24px; text-align: center; font-weight: bold"><u>AUTORIZAÇÃO DE CONDUÇÃO</u></div>
		<br />
		<div>
			Eu, <b>Weza Josenilda Suquina Inácio</b>, nascida aos 14/08/1990, estado civil solteira, portadora do B.I nº
			<b>001871910LA033</b>, emitido aos 19/10/2015, natural da província de Luanda, município da Maianga, residente em
			Luanda,
			no município do Belas, Centralidade do Kilamba, Bloco S12, 1º Andar, Apartamento nº 13, proprietária do velocípede
			de marca Yamang, número de quadro nº LZ BB 15125CB227013, com o número de motor nº156FMI71201222, com 50cc
			Cilindrada, 2 (dois) lugares de lotação, cor vermelha, com o livrete nº 186–309, registrada aos 27 de Julho de
			2017.
			Venho por meio desta autorizar o senhor <b>{{$employee->name}}</b>, titular do {{$employee->document_type}} nº
			<b>{{$employee->document_number}}</b>, emitido aos
			12/06/2015, nascido aos 25/07/1996, natural de Calulo, a conduzir o referido velocípede.
			Para que não se imponha qualquer impedimento, mandei passar a presente declaração, que vai por mim assinada
			conforme
			o Bilhete de Identidade.
		</div>
		<br />
		<br />
		<div style="text-align: center">
			<div><b>TITULAR</b></div>
			<br />
			<br />
			<div>__________________________________</div>
			<br />
			<div>Weza Josenilda Suquina Inácio</div>
		</div>

		@include('pdfs.admin-docs.footer')
	</div>
</body>

</html>