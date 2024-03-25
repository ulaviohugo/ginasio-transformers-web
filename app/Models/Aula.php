<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'tipo', 'user_id', 'data', 'horario','gym_id'];

    public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
