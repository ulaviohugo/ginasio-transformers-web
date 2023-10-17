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
		Accessory::insert([
			['name' => 'Bojo'],
			['name' => 'Bordado'],
			['name' => 'Botão'],
			['name' => 'Botão Casal'],
			['name' => 'Colchete'],
			['name' => 'Fecho'],
			['name' => 'Tik Tak'],
		]);
	}
}
