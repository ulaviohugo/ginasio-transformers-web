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
			['name' => 'Acessório Feminino', 'created_at' => $now],
			['name' => 'Bijuteria Feminina', 'created_at' => $now],
			['name' => 'Calçado Feminino', 'created_at' => $now],
			['name' => 'Calçado Masculino', 'created_at' => $now],
			['name' => 'Diversos', 'created_at' => $now],
			['name' => 'Perfumaria', 'created_at' => $now],
			['name' => 'Roupa Feminina', 'created_at' => $now],
			['name' => 'Roupa Masculina', 'created_at' => $now],
		]);
	}
}
