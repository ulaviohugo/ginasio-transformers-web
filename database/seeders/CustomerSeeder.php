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
		Customer::insert([
			['name' => 'Berta Felipe'],
			['name' => 'Carla Mateus'],
			['name' => 'Pedro Xavier'],
			['name' => 'Rosa dos Santos'],
			['name' => 'Sandro Joaquim']
		]);
	}
}
