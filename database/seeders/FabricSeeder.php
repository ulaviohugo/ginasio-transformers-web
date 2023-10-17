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
		Fabric::insert([
			['name' => 'Algodão'],
			['name' => 'Cetim'],
			['name' => 'Chifon'],
			['name' => 'Forro'],
			['name' => 'Jeans'],
			['name' => 'Lã'],
			['name' => 'Linho'],
			['name' => 'Malha'],
			['name' => 'Minimate'],
			['name' => 'Organza'],
			['name' => 'Pano Cru'],
			['name' => 'Penas'],
			['name' => 'Poliester'],
			['name' => 'Renda'],
			['name' => 'Sablé'],
			['name' => 'Sarja'],
			['name' => 'Tecido Masculino'],
			['name' => 'Tuli'],
			['name' => 'Viscose'],
			['name' => 'Viscose Dupion'],
			['name' => 'Viscose Printed'],
			['name' => 'Viscose Satin']
		]);
	}
}
