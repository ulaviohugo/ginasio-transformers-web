<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_NOTIFICATIONS;

	protected $fillable = [
		'notifiable',
		'notifiable_id',
		'text',
		'user_id',
		'user_id_update',
	];
}
