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
			border: 1px solid #ccc
		}

		.no-border {
			border: none
		}
	</style>
</head>

<body>
	<div class="page">
		@include('pdfs.admin-docs.header')
		<div style="font-size: 24px; text-align: right; font-weight: bold"><u>JUSTIFICATIVO DE FALTAS</u></div>

		<br />

		<ul style="list-style: none; font-size: 11px" class="border bold">
			<li>a) A este documento deve obrigatoriamente ser anexado o justificativo da ausência;</li>
			<li>b) Os dias em que ocorrerem as faltas injustificadas devem ser indicadas obrigatoriamente;</li>
			<li>c) NOTA: De acordo com a Lei Geral do Trabalho, Artigo 153º linha </li>
			<li>d) “As faltas injustificáveis não poderão exceder 3 vezes em cada mês. Sendo esta considerada INFRACÇÃO
				DISCIPLINAR”.</li>
		</ul>

		<div>
			<table cellspacing="0">
				<tr>
					<td class="no-border">Nome</td>
					<td class="no-border border-b" style="width: 100%">{{$employee->name}}</td>
				</tr>
			</table>

			<table cellspacing="0">
				<tr>
					<td style="width: 130px" class="no-border">Nº do Funcionário</td>
					<td style="width: 50px;" class="no-border">
						<div class="border" style="margin: 8px 0; padding:0 4px; background: #f0f0f0">{{$employee->id}}</div>
					</td>
					<td class="no-border">Função</td>
					<td style="width: 100%;" class="no-border">
						<div class="border" style="margin: 8px 0; padding:0 4px; background: #f0f0f0">{{$employee->position}}</div>
					</td>
				</tr>
			</table>

			<table cellspacing="0">
				<tr>
					<td style="width: 160px" class="no-border">Responsável da área</td>
					<td class="border-b" style="width: 100%">Weza Inácio</td>
				</tr>
			</table>
		</div>
		<br />
		<div class="bold center">MOTIVOS DA AUSÊNCIA</div>
		<table cellspacing="0" style="font-size: 14px">
			<tr>
				<td style="width: 155px">Tipos de Ausência</td>
				<td>Data de Início</td>
				<td>Data de Fim</td>
				<td style="width: 100px">Total de dias Ausentes</td>
				<td style="width: 100%">Descrição</td>
			</tr>
			<tr>
				<td>a) Injustificada</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>b) Estudo</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>c) Acidente de Trabalho</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>d) Casamento</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>e) Doença</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>f) Facelimento Familiar</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>g) Maternidade</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>h) Outros</td>
				<td>___/____/____</td>
				<td>___/____/____</td>
				<td></td>
				<td></td>
			</tr>
		</table>

		<br>
		<div class="bold center">INFORMAÇÕES COMPLEMENTARES</div>
		<br>
		<div class="border-b"></div><br>
		<div class="border-b"></div><br>
		<div class="border-b"></div><br>
		<div class="border-b"></div><br>
		<div class="border-b"></div><br>

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