<?php

namespace Database\Seeders;

use App\Models\User;
use DateInterval;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$date = new DateTime();
		$data = [
			'id' => null,
			'name' => 'Samuel Freitas',
			'gender' => 'Masculino',
			'date_of_birth' => new \DateTime('1992-05-08'),
			'marital_status' => 'Casado',
			'document_type' => 'BI',
			'document_number' => 'X',
			'nif' => 'x',
			'social_security' => 'x',
			'dependents' => 1,
			'education_degree' => 'Bacharel',
			'phone' => '930690710',
			'phone2' => '951855037',
			'email' => 'samuelfreitas.ao@gmail.com',
			'user_name' => 'samuelfreitas',
			'password' => '123456',
			'can_login' => true,
			'role' => 'Admin',
			// 'country_id' => 1,
			// 'province_id' => 1,
			'address' => 'Rua Principal, 123',
			'position' => 'Desenvolvedor',
			'base_salary' => 1980000,
			'hire_date' => $date,
			'contract_end_date' => (new DateTime())->add(new DateInterval('P1Y'))->format('Y-m-d H:i:s'), //1 year
			'created_at' => $date,
		];

		User::create($data);
	}
}
