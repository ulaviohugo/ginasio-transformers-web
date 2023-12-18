<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkStatement extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_WORK_STATEMENTS;

	protected $fillable = [
		'employee_id',
		'file_path',
		'purpose',
		'user_id',
		'user_id_update',
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
