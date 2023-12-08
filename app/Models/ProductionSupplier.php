<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionSupplier extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_SUPPLIERS;

	protected $fillable = [
		'name',
		'representative',
		'email',
		'phone',
		'photo',
		'country_id',
		'province_id',
		'municipality_id',
		'address',
		'user_id',
		'user_id_update',
	];

	public function supplierProducts()
	{
		return $this->hasMany(ProductionSupplierProduct::class);
	}
}
