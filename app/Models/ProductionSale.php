<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionSale extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_SALES;

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
		return $this->hasMany(ProductionProductSale::class);
	}

	public function customer()
	{
		return $this->belongsTo(Customer::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function employee()
	{
		return $this->belongsTo(User::class);
	}
}
