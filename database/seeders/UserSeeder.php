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
				'name' => 'Ulávio Hugo',
				'gender' => 'Masculino',
				'date_of_birth' => new \DateTime('2005-05-19'),
				'marital_status' => 'Solteiro',
				'document_type' => 'Bilhete de Identidade',
				'document_number' => '31LA123',
				'nif' => '31LA123',
				'social_security' => '123456',
				'dependents' => 1,
				'education_degree' => 'Bacharel',
				'phone' => '936699913',
				'phone2' => '951855037',
				'email' => 'ulaviohugo@gmail.com',
				'user_name' => 'ulaviohugo',
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
				'name' => 'Avelino Zua',
				'gender' => 'Masculino',
				'date_of_birth' => new \DateTime('2003-09-12'),
				'marital_status' => 'Solteiro',
				'document_type' => 'Bilhete de Identidade',
				'document_number' => '31LA1234',
				'nif' => '31LA1234',
				'social_security' => '1234567',
				'dependents' => 1,
				'education_degree' => 'Bacharel',
				'phone' => '947465604',
				'phone2' => '',
				'email' => 'avelinosampaio02@gmail.com',
				'user_name' => 'avelinozua',
				'password' => Hash::make('1234567'),
				'can_login' => true,
				'role' => User::ROLE_ADMIN,
				'country_id' => 1,
				'province_id' => 11,
				'municipality_id' => 97,
				'address' => 'Zango3 Rua4, 123',
				'department' => 'Administrativo',
				'position' => 'Assistente Administrativo',
				'base_salary' => 100_000,
				'meal_allowance' => 25_000,
				'productivity_allowance' => 20_000,
				'transportation_allowance' => 20_000,
				'hire_date' => $date,
				'contract_end_date' => (new DateTime())->add(new DateInterval('P5Y'))->format('Y-m-d H:i:s'), //1 year,
				'created_at' => now()
			]
		];

		User::insert($data);
	}
}
