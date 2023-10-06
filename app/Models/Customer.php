<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_CUSTOMERS;

	protected $fillable = [
		'name',
		'photo',
		'gender',
		'te_of_birth',
		'phone',
		'email',
		'country_id',
		'province_id',
		'municipality_id',
		'residential_address',
		'user_id',
		'user_id_update',
	];
}
