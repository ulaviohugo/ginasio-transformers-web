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
            'pagamentoFeito' => false, // Assume inicialmente que o pagamento não foi feito para o mês atual
            'paymentMethod' => $mensalidade->paymentMethod // Adiciona o método de pagamento
        ];
    }

    $atletas[$nomeAtleta]['meses'][] = [
        'mes' => $meses[$mesPagamento],
        'valor' => $valorMensalidade,
        'multa' => (float)$mensalidade->monthlyFine,
        'paymentMethod' => $mensalidade->paymentMethod // Adiciona o método de pagamento por mês
    ];

    $atletas[$nomeAtleta]['totalMensalidade'] += $valorMensalidade;
    $atletas[$nomeAtleta]['totalMulta'] += (float)$mensalidade->monthlyFine;

    // Verifica se o pagamento foi feito para o mês atual
    if ($mesPagamento == $mesAtual) {
        $atletas[$nomeAtleta]['pagamentoFeito'] = true;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recibo de Pagamento</title>
    <style>
        @page {
            /* size: A4 landscape; */
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
        }

        .container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px; /* Espaçamento entre os recibos */
            page-break-inside: avoid; /* Evita quebras de página dentro do container */
        }

        .left-column {
            width: 96%;
            padding: 20px;
            box-sizing: border-box; /* Garante que o padding não aumente o tamanho do elemento */
            border: #ccc 1px solid;
        }

        .center-logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo {
            width: 130px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h2 {
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table th,
        table td {
            border: 1px solid #ccc;
            padding: 8px;
        }

        table th {
            background-color: #f2f2f2;
        }

        table td {
            text-align: center;
        }

        .footer {
            margin-top: 50px;
            text-align: center;
        }

        .footer p {
            margin-bottom: 8px;
        }

        .signature {
            margin-top: 40px;
            text-align: center; /* Centraliza o texto da assinatura */
        }

        .signature p {
            margin-bottom: 0;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <?php foreach ($atletas as $atleta => $info) : ?>
        <div class="container">
            <div class="left-column">
                <div class="center-logo">
                    <img src="<?= $logo ?>" class="logo" alt="Logo">
                </div>
                <div class="header">
                    <h2>Recibo de Pagamento</h2>
                    <p>Data: <?= date('d/m/Y') ?></p>
                </div>
                <h3><?= $atleta ?></h3>
                <p>Ano: <?= $info['ano'] ?></p>
                <p>Criado em: <?= date('d/m/Y', strtotime($info['created_at'])) ?></p>
                <table>
                    <thead>
                        <tr>
                            <th>Mês</th>
                            <th>Valor Mensalidade (R$)</th>
                            <th>Multa (R$)</th>
                            <th>Método de Pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($info['meses'] as $mesInfo) : ?>
                            <tr>
                                <td><?= $mesInfo['mes'] ?></td>
                                <td><?= number_format($mesInfo['valor'], 2) ?></td>
                                <td><?= number_format($mesInfo['multa'], 2) ?></td>
                                <td><?= $mesInfo['paymentMethod'] ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                <!-- Assinatura -->
                <div class="signature">
                    <p>__________________________</p>
                    <p><?= $info['user'] ?></p>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</body>
</html>
