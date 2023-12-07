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
		@include('pdfs.admin-docs.header')
		<div style="font-size: 24px; text-align: right; font-weight: bold"><u>REQUISIÇÃO DE FÉRIAS</u></div>
		<br />

		<div>
			<table cellspacing="0">
				<tr>
					<td class="no-border" style="width: 150">Requisição nº <b>01</b></td>
					<td class="no-border" style="width: 100%">Data ___/____/_____</td>
				</tr>
			</table>

			<table cellspacing="0">
				<tr>
					<td class="no-border" style="width: 240px">Nome Completo do Requerente: </td>
					<td class="no-border border-b" style="width: 100%">{{$employee->name}}</td>
				</tr>
			</table>

			<table cellspacing="0">
				<tr>
					<td style="width: 135px" class="no-border">Nº do Funcionário: </td>
					<td style="width: 50px;" class="no-border border-b">
						{{$employee->id}}
					</td>
					<td class="no-border">Área/Departamento: </td>
					<td style="width: 100%;" class="no-border border-b">
						Administrativo
					</td>
				</tr>
			</table>


			<table cellspacing="0">
				<tr>
					<td class="no-border">Função: </td>
					<td style="width: 100%;" class="no-border border-b">
						{{$employee->position}}
					</td>
				</tr>
			</table>
		</div>
		<br />

		<table cellspacing="0" class="center">
			<tr>
				<td class="no-border bold" rowspan="3" style="width: 100px; text-align:left">Balanço de férias anuais</td>
			</tr>
			<tr>
				<td class="no-border bold">Dias já Gozados</td>
				<td class="no-border bold">Dias Pretendidos</td>
				<td class="no-border bold">Dias em Falta</td>
			</tr>
			<tr>
				<td class="no-border">
					<div class="border"
						style="margin: 8px 0; padding:0 4px; background: #f0f0f0; display: inline-block; width:50px">0</div>
				</td>
				<td class="no-border">
					<div class="border"
						style="margin: 8px 0; padding:0 4px; background: #f0f0f0; display: inline-block; width:50px">0</div>
				</td>
				<td class="no-border">
					<div class="border"
						style="margin: 8px 0; padding:0 4px; background: #f0f0f0; display: inline-block; width:50px">0</div>
				</td>
			</tr>
		</table>
		<br>
		<table cellspacing="0" style="font-size: 14px">
			<tr>
				<td class="no-border">Data de início de férias: </td>
				<td class="no-border">___/____/_____</td>
				<td class="no-border">Data de início de trabalho: </td>
				<td class="no-border">___/____/_____</td>
			</tr>
		</table>
		<br>
		<br>
		<table cellspacing="0">
			<tr>
				<td class="no-border">Férias paga [x]</td>
				<td class="no-border">Férias não paga [ ]</td>
			</tr>
		</table>
		<br>
		<br>

		<div class="border-b">
			Assinatura do colaborador (Nome legível):
			<br>
			<br>
		</div>
		<br>
		<br>
		<br>

		<table cellspacing="0">
			<tr>
				<td class="no-border">Processado pelo RH.</td>
				<td class="no-border">Data: ___/____/_____</td>
			</tr>
		</table>
		<br>
		<br>


		<div class="border-b">
			Assinatura da Diretora Geral ou (Responsável de Área).
			<br>
			<br>
		</div>

		@include('pdfs.admin-docs.footer')
	</div>
</body>

</html>