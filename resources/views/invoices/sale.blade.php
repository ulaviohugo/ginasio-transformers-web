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

body {
padding: 8px
		}

		.page {
			max-width: 800px;
			margin: auto;
			border: 1px solid #666;
			font-family: "Century Gothic";
			font-size: 12px
		}

		table {
			width: 100%
		}

		td {
			padding: 8px
		}

		td.border {
			border-left: 1px solid #666;
			border-bottom: 1px solid #666;
		}

		td.border:first-child {
			border-left: none
		}
	</style>
</head>

<body>
	<?php
ob_start();
echo '
		<tr>
			<td colspan="3" style="background: rgb(217,225,242)"></td>
		</tr>
		';
	$trFeatured = ob_get_clean();
		ob_start();
	?>
	<div class="page">
		<table cellspacing="0">
			<tr>
<td colspan="3" style="background: rgb(34,43,53); height:50px"></td>
</tr>
{!!$trFeatured!!}
<tr>
				<td><b>Nº Factura:</b> <u>{{$sale->id}}</u></td>
				<td style="text-align: right">
					<b>Data</b> <u>{{date('d/m/Y', strtotime($sale->created_at))}}</u>
				</td>
				<td style="text-align: right">
					<b>Hora</b> <u>{{date('H:i:s', strtotime($sale->created_at))}}</u>
				</td>
			</tr>
{!!$trFeatured!!}
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
			</tr>
		</table>

		<table cellspacing="0">
			<tr style="font-weight: bold; background: rgb(32,55,100); color: #fff">
				<td class="border">PRODUTO</td>
				<td class="border">PREÇO</td>
				<td class="border">QUANTIDADE</td>
				<td class="border">DESCONTO</td>
				<td class="border">VALOR TOTAL</td>
			</tr>
			@foreach ($sale->productSales as $productSale)
			<tr>
				<td class="border">{{$productSale->product->name}}</td>
				<td class="border">{{$productSale->unit_price}}</td>
				<td class="border">{{$productSale->quantity}}</td>
				<td class="border">{{$productSale->discount ?? '0,00'}}</td>
				<td class="border">{{$productSale->total_value}}</td>
			</tr>
			@endforeach
			<tr style="font-weight: bold">
				<td></td>
				<td></td>
				<td></td>
				<td class="border">SUBTOTAL</td>
				<td class="border">{{$sale->total_value}}</td>
			</tr>
			<tr style="font-weight: bold">
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
				<td class="border">TOTAL A PAGAR</td>
				<td class="border">{{$sale->amount_paid}}</td>
			</tr>
		</table>
<div style="font-weight: bold; padding: 8px; text-align: center">
	<div style="padding-bottom: 5px">Muito obrigado. Volte sempre!</div>
	<div style="padding-bottom: 5px">A sua preferência nos impulsiona a servir com rigor e qualidade.</div>
	<div style="padding-bottom: 5px; color: rgb(192,0,0)">IVA 14% - Regime de não sujeição - Regime Simplificado</div>
	<div style="padding-bottom: 5px">Sistema desenvolvido por Samuel Freitas - +244 930 690 710</div>
		</div>
	</div>
	<?php
		$invoice = ob_get_clean();
	?>

	{!!$invoice!!}
	<br />
	{!!$invoice!!}
</body>

</html>