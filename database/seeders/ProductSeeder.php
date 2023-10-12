<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		Product::insert([
			['name' => 'Bolsa', 'category_id' => 1],

			['name' => 'Anel', 'category_id' => 2],
			['name' => 'Brinco', 'category_id' => 2],
			['name' => 'Brinco + anel', 'category_id' => 2],
			['name' => 'Brinco + colar', 'category_id' => 2],
			['name' => 'Brinco + pulseira', 'category_id' => 2],
			['name' => 'Colar', 'category_id' => 2],
			['name' => 'Pulseira', 'category_id' => 2],
			['name' => 'Tornozeleira', 'category_id' => 2],

			['name' => 'Havaiana', 'category_id' => 3],
			['name' => 'Sandália alta', 'category_id' => 3],
			['name' => 'Sandália rasa', 'category_id' => 3],
			['name' => 'Sapato', 'category_id' => 3],
			['name' => 'Ténis feminino', 'category_id' => 3],

			['name' => 'Havaiana masculina', 'category_id' => 4],
			['name' => 'Ténis masculino', 'category_id' => 4],

			['name' => 'Etiqueta cetim', 'category_id' => 5],
			['name' => 'Etiqueta papel', 'category_id' => 5],

			['name' => 'Creme desodorizante', 'category_id' => 6],
			['name' => 'Desodorizante corporal', 'category_id' => 6],
			['name' => 'Sabonete em barra', 'category_id' => 6],

			['name' => 'Blazer feminino', 'category_id' => 7],
			['name' => 'Blusa feminina', 'category_id' => 7],
			['name' => 'Calça jeans', 'category_id' => 7],
			['name' => 'Calça social', 'category_id' => 7],
			['name' => 'Camisa feminina', 'category_id' => 7],
			['name' => 'Camiseta feminina', 'category_id' => 7],
			['name' => 'Fato social feminino', 'category_id' => 7],

			['name' => 'Camisa masculina ', 'category_id' => 8],
			['name' => 'Camiseta masculina', 'category_id' => 8]
		]);
	}
}
