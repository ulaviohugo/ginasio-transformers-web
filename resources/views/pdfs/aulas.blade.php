<?php
  $fileHelper = App\Helpers\FileHelper::class; 
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
        <h3>LISTA DE ATLETAS REGISTADOS</h3>
    </div>
    <table>
        <thead>
            <tr>
                <td>Nº</td>
                <td>NOME</td>
                <td>TIPO DA AULA</td>
                <td>PERSONAL TRAINER</td>
                <td>HORÁRIO DA AULA</td>
                <td>UTILIZADOR</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($aulas as $index => $aula) <!-- Define $index here -->
                <tr>
                    <td>{{ $index + 1 }}</td> <!-- Use $index to number rows -->
                    <td>{{ $aula->name }}</td>
                    <td>{{ $aula->tipo}}</td>
                    <td>{{ $aula->personal_trainer_id }}</td>
                    <td>{{ $aula->horario }}</td>
                    <td>{{ $aula->user->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
