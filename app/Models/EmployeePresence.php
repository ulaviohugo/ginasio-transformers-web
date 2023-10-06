<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePresence extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_EMPLOYEE_PRESENCES;

	protected $fillable = [
		'employee_id',
		'date',
		'presence_status',
		'description',
		'user_id',
		'user_id_update',
	];
}
