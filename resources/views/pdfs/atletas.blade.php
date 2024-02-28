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
    <h2>Atletas ({{ count($athletes) }})</h2>
    <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Nome</td>
                <td>Telefone</td>
                <td>E-mail</td>
                <td>Estado</td>
                <td>Inscrição</td>
                <td>Usuario</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($athletes as $athlete)
                <tr>
                    <td>{{ $athlete->id }}</td>
                    <td>{{ $athlete->name }}</td>
                    <td>{{ $athlete->phone }}</td>
                    <td>{{ $athlete->email }}</td>
                    <td>{{ $athlete->status }}</td>
                    <td>{{ $athlete->created_at }}</td>
                    <td>{{ $athlete->user->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
