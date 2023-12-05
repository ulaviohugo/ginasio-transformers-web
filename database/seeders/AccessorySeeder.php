<?php

namespace Database\Seeders;

use App\Models\Accessory;
use Illuminate\Database\Seeder;

class AccessorySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$now = now();
		Accessory::insert([
			['name' => 'Bojo', 'created_at' => $now],
			['name' => 'Bordado', 'created_at' => $now],
			['name' => 'Botão', 'created_at' => $now],
			['name' => 'Botão Casal', 'created_at' => $now],
			['name' => 'Colchete', 'created_at' => $now],
			['name' => 'Fecho', 'created_at' => $now],
			['name' => 'Tik Tak', 'created_at' => $now],
		]);
	}
}
