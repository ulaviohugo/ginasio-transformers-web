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
	<title>Factura de venda</title>
	<style>
		@page {
			/* size: 348px 216px; */
			padding: 0;
			margin: 0;
		}

		* {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
		}

		body {
			font-size: 11px;
		}

		.page {
			max-width: 800px;
			margin: auto;
			padding: 0 48px;
		}

		table {
			width: 100%
		}

		td {
			padding: 8px
		}

		.border {
			border: 1px solid #ddd
		}

		.border-b {
			border-bottom: 1px solid #000
		}

		.bold {
			font-weight: bold
		}
	</style>
</head>

<body>
	<?php
	ob_start();
	?>
	<div class="page">
		<div class="border" style="font-size:14px; margin-bottom: 8px">
			<table>
				<tr>
					<td><img src="{{$logo}}" style="width: 50px; margin: 4px 0" alt=""></td>
					<td style="width: 200px; font-size: 12px">
						<div style="font-weight: bold">{{env('APP_NAME')}}</div>
						<div>NIF: XXXXXX</div>
					</td>
					<td style="width: 100%; font-size: 12px">
						{{env('ADDRESS')}}
					</td>
					<td style="width: 140px">
						<div>CLIENTE</div>
						<div>
							<b>Nº Factura:</b> <u>1</u>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<table class="border" style="margin-bottom: 8px">
			<tr>
				<td>
					<b>
						Cliente</b> <u>Samuel</u>
				</td>
				<td style="text-align: right">
					<b>Pagamento</b> <u>TPA</u>
				</td>
				<td style="text-align: right">
					<b>Antendente</b> <u>Nome Antendente</u>
				</td>
				<td style="text-align: right">
					<b>Data</b> <u>{{date('d/m/Y', strtotime(date('Y-m-d H:i:s')))}}
						{{date('H:i:s', strtotime(date('Y-m-d H:i:s')))}}</u>
				</td>
			</tr>
		</table>

		<table cellspacing="0">
			<tr>
				<td class="border bold" style="width: 90px">CÓDIGO</td>
				<td class="border bold">MÊS</td>
				<td class="border bold" style="width: 80px">PREÇO</td>
				<td class="border bold" style="width: 80px">DESCONTO</td>
				<td class="border bold" style="width: 80px">MULTA</td>
				<td class="border bold" style="width: 80px">VALOR TOTAL</td>
			</tr>
			<tr>
				<td class="border">23</td>
				<td class="border">{{App\Helpers\DateHelper::months[11]}} de 2024</td>
				<td class="border">23</td>
				<td class="border">23</td>
				<td class="border">23</td>
				<td class="border">23</td>
			</tr>
			<tr style="font-weight: bold">
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td class="border">SUBTOTAL</td>
				<td class="border">23333</td>
			</tr>
			<tr style="font-weight: bold">
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td class="border">IVA 14%</td>
				<td class="border">0,00</td>
			</tr>
			<tr style="font-weight: bold">
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td class="border">TOTAL A PAGAR</td>
				<td class="border">Total</td>
			</tr>
		</table>
		<div style="padding: 8px; text-align: center; margin-top: 8px">
			<div style="padding-bottom: 5px">Muito obrigado. Volte sempre!</div>
			<div style="padding-bottom: 5px">A sua preferência nos impulsiona a servir com rigor e qualidade.</div>
			<div style="padding-bottom: 5px; color: rgb(192,0,0)">IVA 14% - Regime de não sujeição - Regime Simplificado
			</div>
			<div style="padding-bottom: 5px">Tel. +244 923 824 204</div>
			<div style="padding-bottom: 5px">Sistema desenvolvido por Ulávio Hugo - +244 936 699 913</div>
		</div>
	</div>
	<?php
		$invoice = ob_get_clean();
	?>

	<br />
	<br />
	<br />
	{!!$invoice!!}
	<br />
	<div style="color: #888; border: 0; padding: 0; font-size: 9px; text-align: center">
		- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		- - - - - - - - - -
		corte aqui
		- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		- - - - - - - - - -
	</div>
	<br />
	<br />
	{!!str_replace('CLIENTE',env('APP_NAME'),$invoice)!!}
</body>

</html>