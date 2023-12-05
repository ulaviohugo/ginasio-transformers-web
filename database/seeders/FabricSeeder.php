<?php

namespace Database\Seeders;

use App\Models\Fabric;
use Illuminate\Database\Seeder;

class FabricSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$now = now();

		Fabric::insert([
			['name' => 'Algodão', 'created_at' => $now],
			['name' => 'Cetim', 'created_at' => $now],
			['name' => 'Chifon', 'created_at' => $now],
			['name' => 'Forro', 'created_at' => $now],
			['name' => 'Jeans', 'created_at' => $now],
			['name' => 'Lã', 'created_at' => $now],
			['name' => 'Linho', 'created_at' => $now],
			['name' => 'Malha', 'created_at' => $now],
			['name' => 'Minimate', 'created_at' => $now],
			['name' => 'Organza', 'created_at' => $now],
			['name' => 'Pano Cru', 'created_at' => $now],
			['name' => 'Penas', 'created_at' => $now],
			['name' => 'Poliester', 'created_at' => $now],
			['name' => 'Renda', 'created_at' => $now],
			['name' => 'Sablé', 'created_at' => $now],
			['name' => 'Sarja', 'created_at' => $now],
			['name' => 'Tecido Masculino', 'created_at' => $now],
			['name' => 'Tuli', 'created_at' => $now],
			['name' => 'Viscose', 'created_at' => $now],
			['name' => 'Viscose Dupion', 'created_at' => $now],
			['name' => 'Viscose Printed', 'created_at' => $now],
			['name' => 'Viscose Satin', 'created_at' => $now],
		]);
	}
}
