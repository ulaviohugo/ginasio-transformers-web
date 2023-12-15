<?php 
$fileHelper =App\Helpers\FileHelper::class; 

$logoPath = $fileHelper::logoPath();
$logo = $fileHelper::convertToBase64($logoPath);

$totalSalary = 0;
$totalDiscount = 0;

$employee = $salaryReceipt->employee;

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
		* {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
		}

		body {
			/* padding: 8px */
			font-size: 11px;
		}

		@page {
			/* size: 210mm 297mm; */
			padding: 0;
			margin: 0;
		}

		.page {
			max-width: 800px;
			margin: auto;
			padding: 0 48px;
			/* border: 1px solid #666 */
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
			border: 1px solid #ddd
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
					<td><img src="{{$logo}}" style="width: 50px; margin: 4px 0" alt=""></td>
					<td style="width: 100%"><b>RECIBO DE PAGAMENTO DE SALÁRIO</b></td>
					<td style="width: 200px">{{App\Helpers\DateHelper::months[$salaryReceipt->month]}} - {{$salaryReceipt->year}}
					</td>
					<td style="width: 100px">
						<div>Original</div>
						<div><b>Nº {{$salaryReceipt->id}}</b></div>
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
					<td>NIF</td>
					<td>Nº INSS</td>
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
								<td style="color:#C00000">{{App\Helpers\NumberHelper::formatCurrency($totalDiscount)}} Kz</td>
								<td style="color: #00B050">{{App\Helpers\NumberHelper::formatCurrency($netSalary)}} Kz</td>
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
					<td>{{$salaryReceipt->observation}}</td>
				</tr>
			</table>
		</div>
		<div class="border">
			<br>
			<center><b>DECLARO TER RECEBIDO A I MPOTÂNCIA LÍQUIDA DISCRIMINADA NESTE RECIBO</b></center>
			<table style="text-align: center">
				<tr>
					<td style="text-align: right">
						____/____/________
						<br />
						DATA &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
					</td>
					<td>
						______________________________________
						<br />
						ASSINATURA DO FUNCIONÁRIO
					</td>
				</tr>
			</table>
		</div>
	</div>
	<?php
		$html =	ob_get_clean();	
	?>

	{{-- Original --}}
	<br />
	<br />
	<br />
	{!!$html!!}
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

	{{-- Duplicado --}}
	{!!str_replace('Original', 'Cópia', $html)!!}
</body>

</html>