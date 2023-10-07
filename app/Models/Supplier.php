<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_SUPPLIERS;

	protected $fillable = [
		'name',
		'representative',
		'email',
		'phone',
		'photo',
		'country_id',
		'province_id',
		'municipality_id',
		'address',
		'user_id',
		'user_id_update',
	];
}
