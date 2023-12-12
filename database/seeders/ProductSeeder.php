<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$date = now();
		Product::insert([
			['name' => 'Bolsa', 'category_id' => 1, 'created_at' => $date],

			['name' => 'Anel', 'category_id' => 2, 'created_at' => $date],
			['name' => 'Brinco', 'category_id' => 2, 'created_at' => $date],
			['name' => 'Brinco + anel', 'category_id' => 2, 'created_at' => $date],
			['name' => 'Brinco + colar', 'category_id' => 2, 'created_at' => $date],
			['name' => 'Brinco + pulseira', 'category_id' => 2, 'created_at' => $date],
			['name' => 'Colar', 'category_id' => 2, 'created_at' => $date],
			['name' => 'Pulseira', 'category_id' => 2, 'created_at' => $date],
			['name' => 'Tornozeleira', 'category_id' => 2, 'created_at' => $date],

			['name' => 'Havaiana', 'category_id' => 3, 'created_at' => $date],
			['name' => 'Sandália Alta', 'category_id' => 3, 'created_at' => $date],
			['name' => 'Sandália Rasa', 'category_id' => 3, 'created_at' => $date],
			['name' => 'Sapato', 'category_id' => 3, 'created_at' => $date],
			['name' => 'Ténis Feminino', 'category_id' => 3, 'created_at' => $date],

			['name' => 'Havaiana Masculina', 'category_id' => 4, 'created_at' => $date],
			['name' => 'Ténis Masculino', 'category_id' => 4, 'created_at' => $date],

			['name' => 'Etiqueta Cetim', 'category_id' => 5, 'created_at' => $date],
			['name' => 'Etiqueta Papel', 'category_id' => 5, 'created_at' => $date],

			['name' => 'Creme Desodorizante', 'category_id' => 6, 'created_at' => $date],
			['name' => 'Desodorizante Corporal', 'category_id' => 6, 'created_at' => $date],
			['name' => 'Sabonete em Barra', 'category_id' => 6, 'created_at' => $date],

			['name' => 'Blazer Feminino', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Blusa Feminina', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Calça Jeans', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Calça Social', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Camisa Feminina', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Camiseta Feminina', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Fato Social Feminino', 'category_id' => 7, 'created_at' => $date],

			['name' => 'Camisa Masculina ', 'category_id' => 8, 'created_at' => $date],
			['name' => 'Camiseta Masculina', 'category_id' => 8, 'created_at' => $date]
		]);
	}
}
