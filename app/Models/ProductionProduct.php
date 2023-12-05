<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionProduct extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_PRODUCTS;
	protected $fillable = [
		'name',
		'user_id',
		'user_id_update',
	];
}
