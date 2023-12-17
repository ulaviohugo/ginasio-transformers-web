<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryReceipt extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_SALARY_RECEIPTS;

	protected $fillable = [
		'employee_id',
		'file_path',
		'work_days',
		'year',
		'month',
		'observation',
		'base_salary',
		'base_salary_received',
		'net_salary',
		'gross_salary',
		'meal_allowance',
		'productivity_allowance',
		'transportation_allowance',
		'family_allowance',
		'christmas_allowance',
		'holiday_allowance',
		'total_salary_discounts',
		'inss_discount',
		'inss_discount_percent',
		'irt_discount',
		'irt_discount_percent',
		'user_id',
	];

	public function employee()
	{
		return $this->belongsTo(User::class, 'employee_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
