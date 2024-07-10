<?php
$fileHelper = App\Helpers\FileHelper::class; 
$logoPath = $fileHelper::logoPath();
$logo = $fileHelper::convertToBase64($logoPath);  

$meses = [
    1 => 'Janeiro',
    2 => 'Fevereiro',
    3 => 'Março',
    4 => 'Abril',
    5 => 'Maio',
    6 => 'Junho',
    7 => 'Julho',
    8 => 'Agosto',
    9 => 'Setembro',
    10 => 'Outubro',
    11 => 'Novembro',
    12 => 'Dezembro'
];

// Descobrir o mês atual
$mesAtual = date('n');

// Agrupa as mensalidades por atleta
$atletas = [];
foreach ($mensalidades as $mensalidade) {
    $nomeAtleta = $mensalidade->atleta->name;
    $mesPagamento = (int)$mensalidade->month;
    $valorMensalidade = (float)$mensalidade->monthlyValue;

    if (!isset($atletas[$nomeAtleta])) {
        $atletas[$nomeAtleta] = [
            'meses' => [],
            'totalMensalidade' => 0.0,
            'totalMulta' => 0.0,
            'ano' => $mensalidade->year,
            'created_at' => $mensalidade->created_at,
            'user' => $mensalidade->user->name,
            'pagamentoFeito' => false // Assume inicialmente que o pagamento não foi feito para o mês atual
        ];
    }

    $atletas[$nomeAtleta]['meses'][] = $meses[$mesPagamento];
    $atletas[$nomeAtleta]['totalMensalidade'] += $valorMensalidade;
    $atletas[$nomeAtleta]['totalMulta'] += (float)$mensalidade->monthlyFine;

    // Verifica se o pagamento foi feito para o mês atual (junho)
    if ($mesPagamento == $mesAtual) {
        $atletas[$nomeAtleta]['pagamentoFeito'] = true;
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gerar PDF</title>
    <style>
        @page { size: A4 landscape; } /* Define a orientação da página */
        table {
            width: 100%;
        }

        thead tr {
            background: #d7d7d7;
            font-weight: bold;
            text-align: center;
        }

        tbody tr {
            background: #f5f5f5;
            text-align: center;
        }

        tbody tr.pagamento-feito td {
        }

        tbody tr.pagamento-nao-feito td {
            background-color: #ffcccc;
        }

        tbody tr:nth-child(2n) {
            background: #f5f5f5;
        }

        .center-logo {
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="center-logo">
        <img src="{{$logo}}" style="width: 130px" alt="">
        <h4>GINÁSIO TRANSFORMERS</h4>
        <h3>LISTA DE ATLETAS REGULARIZADOS</h3>
    </div>
    <table>
        <thead>
            <tr>
                <td>Nº</td>
                <td>Nome</td>
                <td>Meses</td>
                <td>Ano</td>
                <td>Mensalidade</td>
                <td>Multa</td>
                <td>Data</td>
                <td>Utilizador</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($atletas as $nome => $atleta)
                <tr class="{{ $atleta['pagamentoFeito'] ? 'pagamento-feito' : 'pagamento-nao-feito' }}">
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $nome }}</td>
                    <td>{{ implode(', ', $atleta['meses']) }}</td>
                    <td>{{ $atleta['ano'] }}</td>
                    <td>{{ number_format($atleta['totalMensalidade'], 2, ',', '.') }}</td>
                    <td>{{ number_format($atleta['totalMulta'], 2, ',', '.') }}</td>
                    <td>{{ $atleta['created_at'] }}</td>
                    <td>{{ $atleta['user'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
