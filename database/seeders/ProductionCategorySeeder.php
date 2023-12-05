<?php

namespace Database\Seeders;

use App\Models\ProductionCategory;
use Illuminate\Database\Seeder;

class ProductionCategorySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$now = now();
		ProductionCategory::insert([
			['name' => 'Costura', 'created_at' => $now],
			['name' => 'Outros', 'created_at' => $now],
		]);
	}
}
