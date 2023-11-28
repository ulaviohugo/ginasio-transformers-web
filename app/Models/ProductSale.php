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
		'category_id',
		'sale_id',
		'lot',
		'bar_code',
		'quantity',
		'total_value',
		'unit_price',
		'amount_paid',
		'color',
		'size',
		'discount',
		'employee_id',
		'user_id',
		'user_id_update',
		'created_at',
	];

	public function sale()
	{
		return $this->belongsTo(Sale::class);
	}

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function category()
	{
		return $this->belongsTo(Category::class);
	}
}
