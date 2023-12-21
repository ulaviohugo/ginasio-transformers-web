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
					<td style="width: 100px">NIF: XXXXXX</td>
					<td style="width: 100%">
						{{env('ADDRESS')}}
					</td>
					<td style="width: 100px">
						<div>CLIENTE</div>
						<div>
							<b>Nº Factura:</b> <u>{{$sale->id}}</u>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<table class="border" style="margin-bottom: 8px">
			<tr>
				<td>
					<b>
						Cliente</b> <u>{{$sale->customer?->name ?? 'N/A'}}</u>
				</td>
				<td style="text-align: right">
					<b>Pagamento</b> <u>{{$sale->payment_method}}</u>
				</td>
				<td style="text-align: right">
					<b>Antendente</b> <u>{{$sale->employee?->name ?? $sale->user?->name}}</u>
				</td>
				<td style="text-align: right">
					<b>Data</b> <u>{{date('d/m/Y', strtotime($sale->created_at))}}
						{{date('H:i:s', strtotime($sale->created_at))}}</u>
				</td>
			</tr>
		</table>

		<table cellspacing="0">
			<tr>
				<td class="border bold" style="width: 90px">CÓDIGO BARRA</td>
				<td class="border bold">PRODUTO</td>
				<td class="border bold" style="width: 80px">PREÇO</td>
				<td class="border bold" style="width: 80px">QUANTIDADE</td>
				<td class="border bold" style="width: 80px">DESCONTO</td>
				<td class="border bold" style="width: 80px">VALOR TOTAL</td>
			</tr>
			@foreach ($sale->productSales as $productSale)
			<tr>
				<td class="border">{{$productSale->product->id}}</td>
				<td class="border">{{$productSale->product->name}}</td>
				<td class="border">{{App\Helpers\NumberHelper::formatCurrency($productSale->unit_price)}}</td>
				<td class="border">{{$productSale->quantity}}</td>
				<td class="border">{{$productSale->discount ? App\Helpers\NumberHelper::formatCurrency($productSale->discount)
					:
					'0,00'}}</td>
				<td class="border">{{App\Helpers\NumberHelper::formatCurrency($productSale->total_value)}}</td>
			</tr>
			@endforeach
			<tr style="font-weight: bold">
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td class="border">SUBTOTAL</td>
				<td class="border">{{App\Helpers\NumberHelper::formatCurrency($sale->total_value)}}</td>
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
				<td class="border">{{App\Helpers\NumberHelper::formatCurrency($sale->amount_paid)}}</td>
			</tr>
		</table>
		<div style="padding: 8px; text-align: center; margin-top: 8px">
			<div style="padding-bottom: 5px">Muito obrigado. Volte sempre!</div>
			<div style="padding-bottom: 5px">A sua preferência nos impulsiona a servir com rigor e qualidade.</div>
			<div style="padding-bottom: 5px; color: rgb(192,0,0)">IVA 14% - Regime de não sujeição - Regime Simplificado
			</div>
			<div style="padding-bottom: 5px">Tel. +244 923 824 204</div>
			<div style="padding-bottom: 5px">Sistema desenvolvido por Samuel Freitas - +244 930 690 710</div>
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
	{!!str_replace('CLIENTE','WO',$invoice)!!}
</body>

</html>