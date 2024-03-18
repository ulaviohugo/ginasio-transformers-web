<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $fillable = ["name","description",'user_id','gym_id','user_id_update'];

    public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}

    public function gym()
	{
		return $this->belongsTo(Gym::class, 'gym_id');
	}
}
