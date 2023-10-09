<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_TRANSACTIONS;

	protected $fillable = [
		'description',
		'operation_type',
		'amount',
		'payment_method',
		'date',
		'cash_register_id',
		'post_movement_balance',
		'employee_id',
		'user_id',
		'update_by_id',
	];
}
