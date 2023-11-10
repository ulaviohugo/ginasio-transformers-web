<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$date = now();
		Customer::insert([
			['name' => 'Berta Felipe', 'created_at' => $date],
			['name' => 'Carla Mateus', 'created_at' => $date],
			['name' => 'Pedro Xavier', 'created_at' => $date],
			['name' => 'Rosa dos Santos', 'created_at' => $date],
			['name' => 'Sandro Joaquim', 'created_at' => $date]
		]);
	}
}
