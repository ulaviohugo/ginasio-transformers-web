<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_ABSENCE_JUSTIFICATIONS;

	protected $fillable = [
		'customer_id',
		'file_path',
		'purchase_date',
		'category_id',
		'product_id',
		'phone',
		'email',
		'province_id',
		'municipality_id',
		'iban',
		'amount',
		'description',
		'user_id',
		'user_id_update',
	];

	public function customer()
	{
		return $this->belongsTo(Customer::class, 'customer_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
