<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>

<body>
	Saudações estimado(a) <b>{{$customer->name}}</b>,
	<br />
	<br />
	Segue em anexo a factura de compra efectuada no dia {{date('d/m/Y', strtotime($sale->created_at))}} na WO.
</body>

</html>