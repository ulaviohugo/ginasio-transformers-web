<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>

<body>
Saudações estimad{{$customer->gender=='Masculino' ? 'o':($customer->gender=='Feminino' ? 'a':'o (a)')}}
<b>{{$customer->name}}</b>,
	<br />
	<br />
Segue em anexo a factura da compra efectuada no dia {{date('d/m/Y', strtotime($sale->created_at))}}
às {{date('H:i', strtotime($sale->created_at))}}H na WO.
</body>

</html>