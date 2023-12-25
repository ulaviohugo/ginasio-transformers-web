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
			padding: 8px;
			font-size: 12px;
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
	<?php
	ob_start();
	?>
	<div class="page">
		<table>
			<tr>
				<td>@include('pdfs.admin-docs.logo')</td>
				<td style="font-size: 24px; text-align: right; font-weight: bold"><u>FORMULÁRIO DE REEMBOLSO</u></td>
			</tr>
		</table>

		<br />

		<div>
			Preencha todo o formulário abaixo. Todos os recibos devem ser anexados ao formulário e enviados por email para
			{{env('APP_MAIL')}}.
		</div>
		<br />

		<div>
			<table>
				<tr>
					<td style="width:110px;">Nome do Cliente:</td>
					<td class="border-b w-full"></td>
					<td style="width: 105px">Data da Compra</td>
					<td style="width: 80px" class="border-b">12/12/2023</td>
				</tr>
			</table>
			<table>
				<tr>
					<td style="width:121px;">Código do Produto:</td>
					<td class="border-b">12</td>
					<td style="width: 137px">Categoria do Produto:</td>
					<td style="" class="border-b">2</td>
					<td style="">Produto:</td>
					<td class="w-full" class="border-b w-full">Calça Jeans Masculino</td>
				</tr>
			</table>
			<table>
				<tr>
					<td style="width:60px;">Telefone:</td>
					<td style="width:110px;" class="border-b">244 930 690 710</td>
					<td style="width: 44px">E-mail:</td>
					<td style="" class="border-b">samuelfreitas.ao@gmail.com</td>
				</tr>
			</table>
			<table>
				<tr>
					<td style="">Município/Bairro</td>
					<td style="width: 180px" class="border-b"></td>
					<td style="">Endereço:</td>
					<td style="" class="border-b w-full"></td>
				</tr>
			</table>
		</div>
		<br>

		{{-- <table cellspacing="0">
			<tr>
				<td class="w-full">Descrição da Compra</td>
				<td style="width: 180px; padding-left: 20px" class="center">Valor</td>
			</tr>
			@for ($i = 0; $i < 4; $i++) <tr>
				<td style="padding-top: 16px">
					<div class="border-b"></div>
				</td>
				<td style="width:170px; padding: 16px 0 0 20px">
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
		<br> --}}

		<div style="border: 1px solid #ddd; padding: 0 0 16px 0">
			<table>
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
			</table>
			<table>
				<tr>
					<td style="width: 150px">Descrição da Devolução</td>
					<td colspan="5" class="border-b" style="width: 100px"></td>
				</tr>
			</table>
		</div>

		<?php ob_start() ?>
		@include('pdfs.admin-docs.footer')
		<?php 
			$footer = str_replace('position: absolute;','',ob_get_clean());
			$footer = str_replace('transform: translateX(-50%);','',$footer);
			
		?>
		<br>
		<div style="text-align: center">
			{!!$footer!!}
		</div>
	</div>

	<?php
		$html = ob_get_clean();
	?>

	{!!$html!!}
	@include('pdfs.components.cutter')
	{!!$html!!}
</body>

</html>