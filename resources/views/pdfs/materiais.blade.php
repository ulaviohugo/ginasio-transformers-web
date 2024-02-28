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
    </style>
</head>

<body>
    <h2>Materiais ({{ count($equipments) }})</h2>
    <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Nome</td>
                <td>Data</td>
                <td>Usuario</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($equipments as $equipement)
                <tr>
                    <td>{{ $equipement->id }}</td>
                    <td>{{ $equipement->name }}</td>
                    <td>{{ $equipement->created_at }}</td>
                    <td>{{ $equipement->user->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
