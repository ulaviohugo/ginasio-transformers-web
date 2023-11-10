<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_CUSTOMERS;
	const TYPE_DEFAULT = 'Padrão',
		TYPE_VIP = 'VIP';

	protected $fillable = [
		'name',
		'photo',
		'date_of_birth',
		'phone',
		'email',
		'country_id',
		'province_id',
		'municipality_id',
		'address',
		'customer_type',
		'user_id',
		'user_id_update',
	];
}
