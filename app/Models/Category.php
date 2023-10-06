<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_CATEGORIES;

	protected $fillable = [
		'name',
		'user_id',
		'user_id_update',
	];
}
