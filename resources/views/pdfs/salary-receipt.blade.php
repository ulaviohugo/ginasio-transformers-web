<?php 
$totalSalary = 0;
$totalDiscount = 0;

foreach($salaryInfo as $item){
	if ($item['title'] == "Vencimentos"){
		$totalSalary = array_reduce($item['contents'], function($acc, $current) {
        return $acc + (float)$current;
    }, 0);
	}

	if ($item['title'] == "Descontos"){
		$totalDiscount = array_reduce($item['contents'], function($acc, $current) {
        return $acc + (float)$current;
    }, 0);
	}
}
$netSalary = $totalSalary - $totalDiscount;
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Recibo de salário - {{$employee->name}}</title>
	<style>
		body {
			/* padding: 8px */
			font-size: 12px;
		}

		@page {
			/* size: 210mm 297mm; */
			padding: 0;
			margin: 0;
		}

		.page {
			max-width: 800px;
			margin: auto;
			padding: 8px;
			border: 1px solid #666
		}

		table {
			width: 100%;
		}

		td {
			padding: 0 8px
		}

		div {
			padding: 0 8px;
			margin-bottom: 8px;
		}

		.page div:last-child {
			margin-bottom: 0;
		}

		.border {
			border: 1px solid #000
		}
	</style>
</head>

<body>
	<?php
		ob_start();	
	?>
	<div class="page">
		<div class="border">
			<table>
				<tr>
					<td><b>RECIBO DE PAGAMENTO DE SALÁRIO</b></td>
					<td>
						<div>Original</div>
						<div><b>Nº 00001</b></div>
					</td>
				</tr>
			</table>
		</div>
		<div class="border">
			<table>
				<tr style="font-weight: bold">
					<td>ID</td>
					<td>NOME</td>
					<td>FUNÇÃO</td>
					<td>Nº CONTRIBUINTE</td>
					<td>SEGURANÇA SOCIAL</td>
				</tr>
				<tr>
					<td>{{$employee->id}}</td>
					<td>{{$employee->name}}</td>
					<td>{{$employee->position}}</td>
					<td>{{$employee->nif}}</td>
					<td>{{$employee->social_security}}</td>
				</tr>
			</table>
		</div>
		<div class="border">
			<table>
				{{-- Header --}}
				<tr style="font-weight: bold; ">
					@foreach ($salaryInfo as $item)
					<td style="border-bottom: 1px solid #000">{{$item['title']}}</td>
					@endforeach
				</tr>
				{{-- Body --}}
				@foreach ($salaryInfo[0]['contents'] as $i => $item)
				<tr>
					@foreach ($salaryInfo as $j=> $item2)
					<?php 
						$value = $salaryInfo[$j]['contents'][$i];
						if(in_array($salaryInfo[$j]['title'], ['Vencimentos', 'Descontos']) && is_numeric($value)){
							$value = App\Helpers\NumberHelper::formatCurrency($value);
							if($value > 0) {
								$value .=' Kz';
							}
						}
					?>
					<td>{{$value}}</td>
					@endforeach
				</tr>
				@endforeach
			</table>
		</div>
		<div class="border">
			<table>
				<tr>
					<td style="text-align: center; border-right: 1px solid #000">
						<b>ENTREGUEI</b>
						<br />
						<br />
						---------------------------------------------
						<br />
						Weza Inácio
					</td>
					<td>
						<table>
							<tr>
								<td><b>Total de vencimentos</b></td>
								<td><b>Total de descontos</b></td>
								<td><b>Valor líquido</b></td>
							</tr>
							<tr>
								<td>{{App\Helpers\NumberHelper::formatCurrency($totalSalary)}} Kz</td>
								<td>{{App\Helpers\NumberHelper::formatCurrency($totalDiscount)}} Kz</td>
								<td>{{App\Helpers\NumberHelper::formatCurrency($netSalary)}} Kz</td>
							</tr>

						</table>
					</td>
				</tr>
			</table>
		</div>
		<div class="border">
			<table>
				<tr style="font-weight: bold">
					<td>Salário Base</td>
					<td>Valor por dia Dia</td>
					<td>Valor por Hora</td>
					<td>Observação</td>
				</tr>
				<tr>
					<td>
						{{App\Helpers\NumberHelper::formatCurrency($employee->base_salary)}} Kz
					</td>
					<td>
						{{App\Helpers\NumberHelper::formatCurrency(App\Helpers\SalaryHelper::getSalaryPerDay($employee->base_salary))}}
						Kz
					</td>
					<td>
						{{App\Helpers\NumberHelper::formatCurrency(App\Helpers\SalaryHelper::getSalaryPerHour($employee->base_salary))}}
						Kz
					</td>
					<td></td>
				</tr>
			</table>
		</div>
		<div class="border">
			<center><b>DECLARO TER RECEBIDO A I MPOTÂNCIA LÍQUIDA DISCRIMINADA NESTE RECIBO</b></center>
			<table style="text-align: center">
				<tr>
					<td style="text-align: right">
						____/____/________
						<br />
						<b>DATA &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b>
					</td>
					<td>
						______________________________________
						<br />
						<b>ASSINATURA DO FUNCIONÁRIO</b>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<?php
		$html =	ob_get_clean();	
	?>

	{!!$html!!}
	<br />
	<div style="color: #888; border: 0; padding: 0; font-size: 14px">
		- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - corte aqui
		- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	</div>
	<br />
	{!!str_replace('Original', 'Duplicado', $html)!!}
</body>

</html>