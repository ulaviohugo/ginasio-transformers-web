<?php

namespace Database\Seeders;

use App\Models\ProductionProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductionProductSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$now = now();
		ProductionProduct::insert([
			['name' => 'Agulha', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Barbatana', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Botão', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Botão casal', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Colchete', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Fita métrica', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Forro', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Linha', 'category_id' => 1, 'created_at' => $now],
			['name' => 'Viés', 'category_id' => 1, 'created_at' => $now],
		]);
	}
}
