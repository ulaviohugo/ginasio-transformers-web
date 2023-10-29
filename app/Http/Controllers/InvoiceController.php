<?php

namespace App\Http\Controllers;

use App\Models\Sale;

class InvoiceController extends Controller
{
	public function sale(Sale $sale)
	{
		return view('invoices.sale', ['sale' => $sale]);
	}
}
