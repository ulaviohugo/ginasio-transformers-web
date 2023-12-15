<?php
$fileHelper =App\Helpers\FileHelper::class; 

$iconForm = $fileHelper::convertToBase64(public_path('/images/icons/form.png'));
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Formulário de Reembolso</title>

	<style>
		* {
			font-family: 'Calibri (Corpo)', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
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
			position: relative;
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
			/* border: 1px solid #ccc; */
			padding: 2px 4px;
		}

		.no-border {
			border: none
		}

		.w-full {
			width: 100%
		}

		.center {
			text-align: center
		}
	</style>
</head>

<body>
	<div class="page">
		@include('pdfs.admin-docs.header')

		<div style="font-size: 24px; text-align: right; font-weight: bold"><u>FORMULÁRIO DE REEMBOLSO</u></div>

		<br />

		<div>
			Preencha todo o formulário abaixo. Todos os recibos devem ser anexados ao formulário e enviados por email para
			{{env('APP_MAIL')}}.
		</div>
		<br />

		<table cellspacing="0">
			<tr>
				<td style="width: 180px">Data da Compra</td>
				<td class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">Código do Produto:</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">Categoria do Produto:</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">Produto:</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">Telefone:</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">E-mail:</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">Município/Bairro</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">Endereço:</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
			<tr>
				<td style="height: 24px;">Enviar em nome de:</td>
				<td style="height: 24px;" class="border-b w-full"></td>
			</tr>
		</table>
		<br>

		<table cellspacing="0">
			<tr>
				<td class="w-full">Descrição da Compra</td>
				<td style="width: 180px; padding-left: 20px" class="center">Valor</td>
			</tr>
			@for ($i = 0; $i < 6; $i++) <tr>
				<td style="padding-top: 28px">
					<div class="border-b"></div>
				</td>
				<td style="width:170px; padding: 28px 0 0 20px">
					<div class="border-b center"></div>
				</td>
				</tr>
				@endfor
				<tr>
					<td style="text-align: right; padding: 24px 0 0 20px">Total</td>
					<td style="width:170px; padding: 28px 0 0 20px">
						<div class="border-b center"></div>
					</td>
				</tr>
		</table>
		<br>

		<div>
			<table style="border: 1px solid #ddd; padding: 0 0 16px 0">
				<tr>
					<td colspan="6">
						<div style="background: #404040; color: #fff; padding: 8px 0" class="center">
							<b>Uso exclusivo do tesoureiro</b>
						</div>
					</td>
				</tr>
				<tr>
					<td style="padding-top: 16px">IBAN</td>
					<td class="w-full border-b"></td>
					<td>Valor</td>
					<td class="border-b" style="width: 100px"></td>
					<td>Data</td>
					<td class="border-b" style="width: 100px"></td>
				</tr>
				<tr>
					<td style="width: 100px">Descrição da Devolução</td>
					<td colspan="5" class="border-b" style="width: 100px"></td>
				</tr>
			</table>

		</div>

		@include('pdfs.admin-docs.footer')
	</div>
</body>

</html>