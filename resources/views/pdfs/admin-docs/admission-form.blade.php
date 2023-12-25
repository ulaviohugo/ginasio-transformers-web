<?php
$fileHelper =App\Helpers\FileHelper::class; 
$employee = $admission->employee;

$radioChecked = '<div class="radio"><div class="radio-checked"></div></div>';
$radioUnchecked = '<div class="radio"></div>';

$workToolsInDB = json_decode($admission->working_tools);
$clothesProductionTrainingInDB = json_decode($admission->clothes_production_training);

// $workTools = array_unique(array_merge(
// 	[
// 	'Máquina de Costura',
// 	'Tesoura',
// 	'Fita Métrica',
// 	'Alfinete',
// 	'Cracha/Passe',
// 	'Motorizada',
// 	'Capacete',
// 	'Material Escritório',
// ], ($workToolsInDB ?? [])
// ));

// $clothesProductionTraining = array_unique(array_merge(
// 	[
// 	'Modelagem',
// 	'Corte',
// 	'Costura',
// 	'Word',
// 	'Excel',
// 	'Internet',
// ], ($clothesProductionTrainingInDB ?? [])
// ));
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
			padding: 8px;
			font-size: 14px;
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
			border: 1px solid #ddd
		}

		.border-b {
			border-bottom: 1px solid #ddd !important
		}

		table {
			width: 100%
		}

		td {
			padding: 0 8px
		}

		.bold {
			font-weight: bold
		}

		.center {
			text-align: center
		}

		td {
			border: 1px solid #ddd;
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
			margin-right: 4px;
			margin-bottom: 8px;
			border: 1px solid #ddd;
			padding: 2px 8px;
			border-radius: 20px
		}
	</style>
</head>

<body>
	<div class="page">

		<table class="border">
			<tr>
				<td class="no-border">@include('pdfs.admin-docs.logo')</td>
				<td class="no-border" style="width: 100%; font-size:14px"><b><u>FORMULÁRIO DE ADMISSÃO</u></b></td>
				<td class="no-border" style="width: 50px"><b>Nº {{$admission->id}}</b></td>
			</tr>
		</table>
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
				@foreach ($workToolsInDB as $tool)
				<div class="item">
					{{$tool}}
					{{-- @if (in_array($tool, $workToolsInDB))
					{!!$radioChecked!!}
					@else
					{!!$radioUnchecked!!}
					@endif --}}
				</div>
				@endforeach
			</div>
		</div>
		<br />
		<br />

		<div>
			<div class="title">
				3) FORMAÇÃO DE PRODUÇÃO DE ROUPAS
			</div>
			<div>
				@foreach ($clothesProductionTrainingInDB as $training)
				<div class="item">
					{{$training}}
					{{-- @if (in_array($training, $clothesProductionTrainingInDB))
					{!!$radioChecked!!}
					@else
					{!!$radioUnchecked!!}
					@endif --}}
				</div>
				@endforeach
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