<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$now = now();
		Category::insert([
			['name' => 'Acessório feminino', 'created_at' => $now],
			['name' => 'Bijuteria feminina', 'created_at' => $now],
			['name' => 'Calçado feminino', 'created_at' => $now],
			['name' => 'Calçado masculino', 'created_at' => $now],
			['name' => 'Diversos', 'created_at' => $now],
			['name' => 'Perfumaria', 'created_at' => $now],
			['name' => 'Roupa feminina', 'created_at' => $now],
			['name' => 'Roupa masculina', 'created_at' => $now],
		]);
	}
}
