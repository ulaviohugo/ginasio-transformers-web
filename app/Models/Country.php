<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_COUNTRIES;

	protected $fillable = [
		'name',
	];
}
