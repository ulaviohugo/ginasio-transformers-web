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
        <h3>LISTA DE FILIAIS REGISTADOS</h3>
    <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Nome</td>
                <td>Localização</td>
                <td>Data</td>
                <td>Usuario</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($gyms as $gym)
                <tr>
                    <td>{{ $gym->id }}</td>
                    <td>{{ $gym->name }}</td>
                    <td>{{ $gym->location }}</td>
                    <td>{{ $gym->created_at }}</td>
                    <td>{{ $gym->user->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
