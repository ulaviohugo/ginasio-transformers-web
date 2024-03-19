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
    <title>Gerar PDF</title>
    <style>
        table {
            width: 100%
        }

        thead tr {
            background: #d7d7d7; font-weight: bold
        }

        tbody tr:nth-child(2n) {
            background: #f5f5f5
        }
        .center-logo {
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="center-logo">
        <img src="{{$logo}}" style="width: 130px" alt="">
    </div>
    <h2>Atletas que pagaram a mensalidade ({{ count($mensalidades) }})</h2>
    <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Nome</td>
                <td>Mês</td>
                <td>Ano</td>
                <td>Mensalidade</td>
                <td>Multa</td>
                <td>Data</td>
                <td>Usuario</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($mensalidades as $mensalidade)
                <tr>
                    <td>{{ $mensalidade->id }}</td>
                    <td>{{ $mensalidade->atleta->name }}</td>
                    <td>{{ $mensalidade->month }}</td>
                    <td>{{ $mensalidade->year }}</td>
                    <td>{{ $mensalidade->monthlyValue }}</td>
                    <td>{{ $mensalidade->monthlyFine }}</td>
                    <td>{{ $mensalidade->created_at }}</td>
                    <td>{{ $mensalidade->user->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
