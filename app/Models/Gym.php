<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gym extends Model
{
    use HasFactory;

    protected $fillable = ['location','name','user_id','user_id_update'];

    public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
