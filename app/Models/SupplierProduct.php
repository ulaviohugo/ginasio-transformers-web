<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierProduct extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_SUPPLIER_PRODUCTS;

	protected $fillable = [
		'supplier_id',
		'product_id',
		'unit_price',
		'user_id',
		'user_id_update',
	];
}
