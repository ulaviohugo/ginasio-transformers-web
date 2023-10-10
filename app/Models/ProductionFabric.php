<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionFabric extends Model
{
	use HasFactory;

	protected $table = DBHelper::TB_PRODUCTION_FABRICS;

	protected $fillable = [
		'production_id',
		'fabric_id',
		'color',
		'meter',
		'cost',
	];

	public function production_budget()
	{
		return $this->belongsTo(ProductionBudget::class, 'production_id');
	}
}
