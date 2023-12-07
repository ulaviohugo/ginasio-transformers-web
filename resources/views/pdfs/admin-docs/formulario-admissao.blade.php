<?php
$fileHelper =App\Helpers\FileHelper::class; 

$radioChecked = '<div class="radio"><div class="radio-checked"></div></div>';
$radioUnchecked = '<div class="radio"></div>';

$workInstruments = [
	'Máquina de costura',
	'Tesoura',
	'Fita Métrica',
	'Teclado',
	'Computador',
	'Mouse',
	'Cracha/Passe',
	'Impressora',
	'Motorizada',
	'Capacete',
	'Viatura',
	'Material Escritório',
	'Diversos',
];

$competences = [
	'Word',
	'Excel',
	'Power Point',
	'Outlook',
	'Internet',
	'E-mail de Serviço',
];
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Formulário de admissão - {{$employee->name}}</title>

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

		.title {
			font-weight: bold;
			border: 1px solid #ddd;
			background: #f3f3f3;
			padding: 4px 24px;
			margin-bottom: 16px;
		}

		.radio {
			display: inline-block;
			padding: 2px;
			border: 1px solid #666;
			width: 8px;
			height: 8px;
			border-radius: 100%;
		}

		.radio .radio-checked {
			display: inline-block;
			background: #666;
			width: 100%;
			height: 100%;
			border-radius: 100%;
		}

		.item {
			display: inline-block;
			margin-right: 16px;
			margin-bottom: 4px;
		}
	</style>
</head>

<body>
	<div class="page">
		@include('pdfs.admin-docs.header')
		<div style="font-size: 24px; text-align: right; font-weight: bold"><u>FORMULÁRIO DE ADMISSÃO</u></div>
		<br />

		<div>
			<div class="title">
				1) COLABORADOR
			</div>
			<table cellspacing="0">
				<tr>
					<td class="no-border" style="width: 125px">Nome Completo: </td>
					<td class="no-border border-b" style="width: 100%">{{$employee->name}}</td>
				</tr>
			</table>

			<table cellspacing="0">
				<tr>
					<td style="width: 135px" class="no-border">Nº do Funcionário: </td>
					<td style="width: 50px;" class="no-border border-b">
						{{$employee->id}}
					</td>
					<td class="no-border">Função: </td>
					<td style="width: 100%;" class="no-border border-b">
						{{$employee->position}}
					</td>
				</tr>
			</table>

			<table cellspacing="0">
				<tr>
					<td class="no-border">Área/Departamento: </td>
					<td style="width: 100%;" class="no-border border-b">
						Administrativo
					</td>
				</tr>
			</table>

			<table cellspacing="0">
				<tr>
					<td class="no-border">Endereço/Local: </td>
					<td class="no-border border-b" style="width: 100%">{{$employee->address}}</td>
				</tr>
			</table>
		</div>
		<br />
		<br />

		<div>
			<div class="title">
				2) INSTRUMENTOS E CONDIÇÕES DE TRABALHO
			</div>
			<div>
				@foreach ($workInstruments as $instrument)
				<div class="item">{{$instrument}} {!!$radioUnchecked!!}
				</div>
				@endforeach
				<br>
				<br>
				<div class="border-b"></div><br>
				<div class="border-b"></div><br>
				<div class="border-b"></div>
			</div>
		</div>
		<br />
		<br />

		<div>
			<div class="title">
				3) FORMAÇÃO E ACESSO INFORMÁTICO
			</div>
			<div>
				@foreach ($competences as $compentence)
				<div class="item">{{$compentence}} {!!$radioUnchecked!!}</div>
				@endforeach
				<br>
				<br>
				<div class="border-b"></div><br>
				<div class="border-b"></div><br>
				<div class="border-b"></div>
			</div>
		</div>
		<br />
		<br />

		<div>
			<div class="title">
				4) DECLARAÇÃO DE CONCORDÂNCIA
			</div>
			<div class="bold">Colaborador Responsável da Área</div>
			<br>

			<table cellspacing="0">
				<tr>
					<td class="no-border">Assinatura: ____________________</td>
					<td class="no-border" style="text-align: right">Assinatura: ____________________</td>
				</tr>
				<tr>
					<td class="no-border">Data: ______ / ______ / __________</td>
					<td class="no-border" style="text-align: right">Data: ______ / ______ / __________</td>
				</tr>
			</table>
		</div>

		@include('pdfs.admin-docs.footer')
	</div>
</body>

</html>