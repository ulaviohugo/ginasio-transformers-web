<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_MUNICIPALITIES;

	protected $fillable = [
		'province_id',
		'name',
	];
}
