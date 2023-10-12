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
		'category_id',
		'unit_price',
		'user_id',
		'user_id_update',
	];

	public function category()
	{
		return $this->belongsTo(Category::class, 'category_id');
	}

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function supplier()
	{
		return $this->belongsTo(Supplier::class);
	}
}
