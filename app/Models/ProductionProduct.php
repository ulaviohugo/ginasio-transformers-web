<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionProduct extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_PRODUCTS;

	protected $fillable = [
		'name',
		'bar_code',
		'photo',
		'category_id',
		'user_id',
		'user_id_update',
		'supplier_id',
		'color',
		'size',
		'min_stock',
		'max_stock',
		'purchase_price',
		'selling_price',
	];

	public function category()
	{
		return $this->belongsTo(ProductionCategory::class);
	}
}
