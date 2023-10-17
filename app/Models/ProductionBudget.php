<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionBudget extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_BUDGETS;

	protected $fillable = [
		'end_product',
		'date',
		'photo',
		'customer_id',
		'customer_rating',
		'cutting_employee_id',
		'cutting_cost',
		'cutting_duration_per_minute',
		'sewing_employee_id',
		'sewing_cost',
		'sewing_duration_per_minute',
		'variable_cost',
		'finishing_cost',
		'production_cost',
		'selling_cost',
		'discount',
		'total_to_pay',
		'user_id',
		'user_id_update',
	];

	public function customer()
	{
		return $this->belongsTo(Customer::class);
	}

	public function cuttingEmployee()
	{
		return $this->belongsTo(User::class);
	}

	public function sewingEmployee()
	{
		return $this->belongsTo(User::class);
	}

	public function productionAccessories()
	{
		return $this->hasMany(ProductionAccessory::class, 'production_id');
	}

	public function productionFabrics()
	{
		return $this->hasMany(ProductionFabric::class, 'production_id');
	}
}
