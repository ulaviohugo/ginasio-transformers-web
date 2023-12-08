<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionSupplierProduct extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_SUPPLIER_PRODUCTS;

	protected $fillable = [
		'supplier_id',
		'product_id',
		'category_id',
		'unit_price',
		'user_id',
		'user_id_update',
	];

	public function category()
	{
		return $this->belongsTo(ProductionCategory::class, 'category_id');
	}

	public function product()
	{
		return $this->belongsTo(ProductionProduct::class);
	}

	public function supplier()
	{
		return $this->belongsTo(ProductionSupplier::class);
	}
}
