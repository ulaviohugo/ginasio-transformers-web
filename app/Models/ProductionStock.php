<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionStock extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_STOCKS;

	protected $fillable = [
		'photo',
		'lot',
		'supplier_id',
		'category_id',
		'product_id',
		'color',
		'size',
		'unit_price',
		'quantity',
		'initial_quantity',
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
		return $this->belongsTo(ProductionCategory::class);
	}

	public function product()
	{
		return $this->belongsTo(ProductionProduct::class);
	}
}
