<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_SALES;

	protected $fillable = [
		'customer_id',
		'total_value',
		'amount_paid',
		'discount',
		'quantity',
		'employee_id',
		'payment_method',
		'user_id',
		'user_id_update',
	];

	public function productSales()
	{
		return $this->hasMany(ProductSale::class);
	}
}
