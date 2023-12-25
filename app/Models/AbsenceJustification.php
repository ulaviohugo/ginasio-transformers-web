<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenceJustification extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_ABSENCE_JUSTIFICATIONS;

	protected $fillable = [
		'employee_id',
		'file_path',
		'absence_reason',
		'starts_at',
		'ends_at',
		'absent_days',
		'absence_description',
		'adicional_information',
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
