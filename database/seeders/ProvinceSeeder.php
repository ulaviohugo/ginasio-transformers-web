<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		try {
			Province::insert([
				['country_id' => 1, 'name' => 'Bengo'],
				['country_id' => 1, 'name' => 'Benguela'],
				['country_id' => 1, 'name' => 'Bié'],
				['country_id' => 1, 'name' => 'Cabinda'],
				['country_id' => 1, 'name' => 'Cuando-Cubango'],
				['country_id' => 1, 'name' => 'Cuanza Norte'],
				['country_id' => 1, 'name' => 'Cuanza Sul'],
				['country_id' => 1, 'name' => 'Cunene'],
				['country_id' => 1, 'name' => 'Huambo'],
				['country_id' => 1, 'name' => 'Huíla'],
				['country_id' => 1, 'name' => 'Luanda'],
				['country_id' => 1, 'name' => 'Lunda Norte'],
				['country_id' => 1, 'name' => 'Lunda Sul'],
				['country_id' => 1, 'name' => 'Malanje'],
				['country_id' => 1, 'name' => 'Moxico'],
				['country_id' => 1, 'name' => 'Namibe'],
				['country_id' => 1, 'name' => 'Uíge'],
				['country_id' => 1, 'name' => 'Zaire'],
			]);
		} catch (\Throwable $th) {
			die($th->getMessage());
		}
	}
}
