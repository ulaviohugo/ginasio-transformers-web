<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_PROVINCES;

	protected $fillable = [
		'country_id',
		'name',
	];
}
