<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSale extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_PRODUCT_SALES;

	protected $fillable = [
		'product_id',
		'sale_id',
		'quantity',
		'total_value',
		'unit_price',
		'amount_paid',
		'color',
		'size',
		'discount',
		'user_id',
		'user_id_update',
	];
}
