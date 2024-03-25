<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Athlete extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_ATHLETE;

	const STATUS_ACTIVE = 'active',
		STATUS_INACTIVE = 'inactive';

	protected $fillable = [
		'name',
		'photo',
		'height',
		'date_of_birth',
		'gender',
		'marital_status',
		'document_type',
		'document_number',
		'photo',
		'phone',
		'phone2',
		'email',
		'observation',
		'health_history',
		'education_degree',
		'starting_weight',
		'current_weight',
		'goal_weight',
		'status',
		'country_id',
		'province_id',
		'municipality_id',
		'address',
		'user_id',
		'user_id_update',
		'gym_id'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
	public function mensalidades()
    {
        return $this->hasMany(Mensalidade::class, 'athlete_id');
    }
	public function gym()
	{
		return $this->belongsTo(Gym::class, 'gym_id');
	}
}
