<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		Category::insert([
			['id' => 1, 'name' => 'Medicamentos Injectáveis'],
			['id' => 2, 'name' => 'Medicamento oral'],
			['id' => 3, 'name' => 'Materiais gastáveis']
		]);
	}
}
