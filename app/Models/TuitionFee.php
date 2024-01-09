<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TuitionFee extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_TUITION_FEES;

	protected $fillable = [
		'year',
		'month',
		'amount',
		'fine',
		'athlete_id',
		'user_id',
		'user_id_update',
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
