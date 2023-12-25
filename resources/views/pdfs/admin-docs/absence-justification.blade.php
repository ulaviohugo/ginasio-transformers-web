<?php 
$employee = $justification->employee;

$absenceReasons = array_unique([
	'Injustificada',
	'Estudo',
	'Acidente de Trabalho',
	'Casamento',
	'Doença',
	'Falecimento Familiar',
	'Maternidade',
	$justification->absence_reason,
]);
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Justificativo de falta - {{$employee->name}}</title>

	<style>
		* {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
		}

		body {
			padding: 8px;
			font-size: 12px;
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
			border: 1px solid #ddd
		}

		.no-border {
			border: none
		}
	</style>
</head>

<body>
	<div class="page">
		<table class="border" style="padding: 0 8px;">
			<tr>
				<td class="no-border">@include('pdfs.admin-docs.logo')</td>
				<td class="no-border" style="width: 100%; font-size:14px"><b>JUSTIFICATIVO DE FALTAS</b></td>
				</td>
				<td class="no-border" style="width: 100px">
					<div><b>Nº {{$justification->id}}</b></div>
				</td>
			</tr>
		</table>

		<br />

		<ul style="list-style: none; font-size: 11px" class="border bold">
			<li>a) A este documento deve obrigatoriamente ser anexado o justificativo da ausência;</li>
			<li>b) Os dias em que ocorrerem as faltas injustificadas devem ser indicadas obrigatoriamente;</li>
			<li>c) NOTA: De acordo com a Lei Geral do Trabalho, Artigo 153º linha </li>
			<li>d) “As faltas injustificáveis não poderão exceder 3 vezes em cada mês. Sendo esta considerada INFRACÇÃO
				DISCIPLINAR”.</li>
		</ul>

		<div>
			<table>
				<tr>
					<td class="no-border">Nome</td>
					<td class="no-border border-b" style="width: 100%">{{$employee->name}}</td>
					<td style="width: 98px" class="no-border">Nº do Funcionário</td>
					<td style="width: 30px;" class="no-border border-b">
						{{$employee->id}}
					</td>
				</tr>
			</table>

			<table>
				<tr>
					<td class="no-border">Função</td>
					<td style="width: 100%;" class="no-border border-b">
						{{$employee->position}}
					</td>
					<td style="width: 120px" class="no-border">Responsável da área</td>
					<td class="no-border border-b" style="width: 100%">Weza Inácio</td>
				</tr>
			</table>
		</div>
		<br />
		<br />
		<div class="bold center">MOTIVOS DA AUSÊNCIA</div>
		<br>
		<table cellspacing="0" style="font-size: 13px">
			<tr style="font-weight: bold">
				<td style="width: 145px">Tipos de Ausência</td>
				<td>Data de Início</td>
				<td>Data de Fim</td>
				<td style="width: 80px">Total de dias Ausentes</td>
				<td style="width: 100%">Descrição</td>
			</tr>
			@foreach ($absenceReasons as $i=> $reason)
			<?php $active = $justification->absence_reason == $reason ?>
			<tr style="{{$active ?'background: #f0f0f0': ''}}">
				@if ($active)
				<td style="font-weight: bold">{{$i+1}}) {{$reason}}</td>
				<td>{{date('d/m/Y', strtotime($justification->starts_at))}}</td>
				<td>{{date('d/m/Y', strtotime($justification->ends_at))}}</td>
				<td>{{$justification->absent_days}}</td>
				<td>{{$justification->absence_description}}</td>
				@else
				<td>{{$i+1}}) {{$reason}}</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				@endif
			</tr>
			@endforeach
		</table>

		<br>
		<br>
		<div class="bold center">INFORMAÇÕES COMPLEMENTARES</div>
		<br>
		<div class="border-b">{{$justification->adicional_information}}</div><br>
		<br>
		<br>
		<br>

		<div class="bold">Funcionário</div>
		<table cellspacing="0">
			<tr>
				<td class="no-border">Assinatura:</td>
				<td class="no-border border-b" style="width: 100%"></td>
				<td class="no-border">Data</td>
				<td class="no-border border-b" style="width: 120px"></td>
			</tr>
		</table>
		<br>
		<div class="bold">Responsável da Área</div>
		<table cellspacing="0">
			<tr>
				<td class="no-border">Assinatura:</td>
				<td class="no-border border-b" style="width: 100%"></td>
				<td class="no-border">Data</td>
				<td class="no-border border-b" style="width: 120px"></td>
			</tr>
		</table>

		@include('pdfs.admin-docs.footer')
	</div>
</body>

</html>