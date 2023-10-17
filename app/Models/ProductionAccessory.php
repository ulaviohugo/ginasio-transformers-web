<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionAccessory extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_ACCESSORIES;

	protected $fillable = [
		'production_id',
		'accessory_id',
		'quantity',
		'price',
	];

	public function production_budget()
	{
		return $this->belongsTo(ProductionBudget::class, 'production_id');
	}

	public function accessory()
	{
		return $this->belongsTo(Accessory::class);
	}
}
