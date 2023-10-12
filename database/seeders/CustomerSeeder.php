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
			['name' => 'Berta Felipe', 'gender' => 'Feminino'],
			['name' => 'Carla Mateus', 'gender' => 'Feminino'],
			['name' => 'Pedro Xavier', 'gender' => 'Masculino'],
			['name' => 'Rosa dos Santos', 'gender' => 'Feminino'],
			['name' => 'Sandro Joaquim', 'gender' => 'Masculino']
		]);
	}
}
