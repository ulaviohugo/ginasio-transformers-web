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
			['name' => 'Sandália alta', 'category_id' => 3, 'created_at' => $date],
			['name' => 'Sandália rasa', 'category_id' => 3, 'created_at' => $date],
			['name' => 'Sapato', 'category_id' => 3, 'created_at' => $date],
			['name' => 'Ténis feminino', 'category_id' => 3, 'created_at' => $date],

			['name' => 'Havaiana masculina', 'category_id' => 4, 'created_at' => $date],
			['name' => 'Ténis masculino', 'category_id' => 4, 'created_at' => $date],

			['name' => 'Etiqueta cetim', 'category_id' => 5, 'created_at' => $date],
			['name' => 'Etiqueta papel', 'category_id' => 5, 'created_at' => $date],

			['name' => 'Creme desodorizante', 'category_id' => 6, 'created_at' => $date],
			['name' => 'Desodorizante corporal', 'category_id' => 6, 'created_at' => $date],
			['name' => 'Sabonete em barra', 'category_id' => 6, 'created_at' => $date],

			['name' => 'Blazer feminino', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Blusa feminina', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Calça jeans', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Calça social', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Camisa feminina', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Camiseta feminina', 'category_id' => 7, 'created_at' => $date],
			['name' => 'Fato social feminino', 'category_id' => 7, 'created_at' => $date],

			['name' => 'Camisa masculina ', 'category_id' => 8, 'created_at' => $date],
			['name' => 'Camiseta masculina', 'category_id' => 8, 'created_at' => $date]
		]);
	}
}
