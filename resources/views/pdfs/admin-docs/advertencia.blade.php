<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Adevertância - {{$employee->name}}</title>

	<style>
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
			font-family: "Century Gothic";
		}

		table {
			width: 100%;
		}

		td {
			padding: 8px
		}

		div {
			padding: 0 8px;
		}

		.block {
			display: inline-block;
			padding: 4px 8px;
			background: #ddd;
			border: 1px solid #666
		}
	</style>
</head>

<body>
	<div class="page">
		@include('pdfs.admin-docs.header')
		<div style="font-size: 24px; text-align: right; font-weight: bold"><u>ADVERTÊNCIA DE TRABALHO</u></div>
		<br />
		<div>Referência: <b><i>Advertência no Trabalho</i></b></div>
		<br />
		<table>
			<tr>
				<td style="display: inline-block">Nome do Colaborador</td>
				<td style=" width: 590px">
					<div style="border-bottom: 1px solid #000;">{{$employee->name}}</div>
				</td>
			</tr>
		</table>
		<table>
			<tr>
				<td>Nº do Funcionário: <span class="block">{{$employee->id}}</span></td>
				<td>Função: <span class="block">{{$employee->position}}</span>
				</td>
			</tr>
		</table>
		<div>Área/Cargo:_________________________________________</div>
		<br />
		<br />
		<div>
			Caro colaborador, face aos últimos incidentes, fomos impulsionados a avaliar o seu comportamento não condizente
			com
			as
			normas internas tais como: Chegar sempre atrasado, desrespeitar as normas de segurança obrigatório a todos os
			empregados, agressão verbal aos seus superiores e colegas, sempre que é contrariado em seus atos. Em virtude
			disso,
			fica o colaborador advertido em relação as atitudes acima descritas. Caso se verifique a reincidência das mesmas,
			rescindiremos o contrato de trabalho assinada entre o EMPREGADO e o EMPREGADOR por justa causa.
			<br />
			<br />
			Sem mais.
		</div>
		<br />
		<br />
		<br />
		<div>
			Luanda, ____/______________/____.
		</div>
		<br />
		<br />
		<br />
		<br />
		<div>
			<b>EMPREGADO</b>
		</div>
		<br />
		<div>
			Assinatura: _________________________________ Data: _____/_____ /__________
		</div>
		<br />
		<br />
		<div><b>Responsável dos Recursos Humanos</b></div>
		<br />
		<div>Assinatura: _________________________________</div>

		@include('pdfs.admin-docs.footer')
	</div>

</body>

</html>