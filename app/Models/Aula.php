<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'tipo', 'user_id', 'data', 'horario','gym_id','user_id_update','athlete_id','personal_trainer_id'];

    public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
    public function personal_trainer()
	{
		return $this->belongsTo(User::class, 'personal_trainer_id');
	}
    public function atleta()
    {
        return $this->belongsTo(Athlete::class, 'athlete_id');
    }
    public function gym()
	{
		return $this->belongsTo(Gym::class, 'gym_id');
	}
}