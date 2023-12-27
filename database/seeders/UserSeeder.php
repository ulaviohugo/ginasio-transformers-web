<?php

namespace Database\Seeders;

use App\Models\User;
use DateInterval;
use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$date = new DateTime();
		$data = [
			[
				'name' => 'Samuel Freitas',
				'gender' => 'Masculino',
				'date_of_birth' => new \DateTime('1992-05-08'),
				'marital_status' => 'Casado',
				'document_type' => 'Bilhete de Identidade',
				'document_number' => '000120131LA123',
				'nif' => '000120131LA123',
				'social_security' => '123456',
				'dependents' => 1,
				'education_degree' => 'Bacharel',
				'phone' => '930690710',
				'phone2' => '951855037',
				'email' => 'samuelfreitas.ao@gmail.com',
				'user_name' => 'samuelfreitas',
				'password' => Hash::make('123456'),
				'can_login' => true,
				'role' => User::ROLE_ADMIN,
				'country_id' => 1,
				'province_id' => 11,
				'municipality_id' => 97,
				'address' => 'Rua Principal, 123',
				'department' => 'Administrativo',
				'position' => 'Assistente Administrativo',
				'base_salary' => 100_000,
				'meal_allowance' => 25_000,
				'productivity_allowance' => 20_000,
				'transportation_allowance' => 20_000,
				'hire_date' => $date,
				'contract_end_date' => (new DateTime())->add(new DateInterval('P5Y'))->format('Y-m-d H:i:s'), //1 year,
				'created_at' => now()
			],

			[
				'name' => 'Alana Freitas',
				'gender' => 'Feminino',
				'date_of_birth' => new \DateTime('2002-01-08'),
				'marital_status' => 'Solteiro',
				'document_type' => 'Bilhete de Identidade',
				'document_number' => '000120131LA121',
				'nif' => '000120131LA121',
				'social_security' => '123457',
				'dependents' => 0,
				'education_degree' => 'Bacharel',
				'phone' => '923000000',
				'phone2' => null,
				'email' => 'test@gmail.com',
				'user_name' => null,
				'password' => null,
				'can_login' => false,
				'role' => null,
				'country_id' => 1,
				'province_id' => 11,
				'municipality_id' => 97,
				'address' => 'Rua Principal, 321',
				'department' => 'Operações',
				'position' => 'Coordenador de operações',
				'base_salary' => 60_000,
				'meal_allowance' => 15_000,
				'productivity_allowance' => 10_000,
				'transportation_allowance' => 15_000,
				'hire_date' => $date,
				'contract_end_date' => (new DateTime())->add(new DateInterval('P5Y'))->format('Y-m-d H:i:s'), //1 year,
				'created_at' => now()
			]
		];

		User::insert($data);
	}
}
