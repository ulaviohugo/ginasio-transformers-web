<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePresence extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_EMPLOYEE_PRESENCES;
	const PRESENT = 'P', ABSENT = 'F';

	protected $fillable = [
		'employee_id',
		'date',
		'entry_time',
		'exit_time',
		'delay_duration',
		'presence_status',
		'description',
		'user_id',
		'user_id_update',
	];
}
