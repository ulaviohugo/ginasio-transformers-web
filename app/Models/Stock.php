<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_STOCK;

	protected $fillable = [
		'photo',
		'lot',
		'bar_code',
		'supplier_id',
		'category_id',
		'product_id',
		'color',
		'size',
		'unit_price',
		'quantity',
		'total_value',
		'payment_method',
		'paid',
		'purchase_date',
		'due_date',
		'employee_id',
		'user_id',
		'user_id_update',
	];

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function product()
	{
		return $this->belongsTo(Product::class);
	}
}
