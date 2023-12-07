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
	<title>Declaração de trabalho - {{$employee->name}}</title>

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
			padding: 48px;
		}

		.border {
			border: 1px solid #ccc
		}

		.border-b {
			border-bottom: 1px solid #ccc !important
		}

		table {
			width: 100%
		}

		.bold {
			font-weight: bold
		}

		.center {
			text-align: center
		}

		td {
			border: 1px solid #ccc;
			padding: 2px 4px;
		}

		.no-border {
			border: none
		}
	</style>
</head>

<body>
	<div class="page">
		<img src="{{$logo}}" style="width: 100px" alt="">
		<br> <br> <br> <br>
		<div style="font-size: 24px" class="center"><b>DECLARAÇÃO</b></div>
		<br> <br>

		<div>
			Para todos efeitos legais, declara-se que <b><u>{{$employee->name}}</u></b>, de nacionalidade Angolana, portadora
			do
			B.I nº {{$employee->document_number}} é funcionária da empresa por tempo indeterminado, admitida no dia
			{{date('d', strtotime($employee->hire_date))}} de
			{{App\Helpers\DateHelper::months[date('m', strtotime($employee->hire_date))]}}
			de {{date('Y', strtotime($employee->hire_date))}},
			exercendo a função de Gestora Comercial, auferindo mensalmente
			o salário base de {{App\Helpers\NumberHelper::formatCurrency($employee->base_salary)}} Akz e subsídio de
			transporte e alimentação no valor de 30.000,00 Akz
			(Trinta Mil Kwanzas).
		</div>
		<br>

		<div>
			Por ser verdade mandou-se passar a presente declaração, que vai devidamente assinada e autenticada com carimbo a
			óleo, em uso nesta empresa, para efeito de VISTO.
		</div>
		<br><br><br>

		<div>
			Luanda, {{date('d')}} de {{App\Helpers\DateHelper::months[date('m')]}} de {{date('Y')}}.
		</div>
		<br><br><br><br>
		<br><br><br><br>
		<br><br><br><br>

		<div class="center">
			Direcção Geral
			<br>
			<br>
			<div style="display: inline-block; width: 200px" class="border-b"></div>
		</div>

		@include('pdfs.admin-docs.footer')
	</div>
</body>

</html>