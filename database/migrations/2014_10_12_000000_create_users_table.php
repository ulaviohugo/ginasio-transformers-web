<?php

use App\Helpers\DBHelper;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create(DBHelper::TB_USERS, function (Blueprint $table) {
			$table->id();
			$table->string('name', 50);
			$table->string('email', 50)->nullable()->unique();
			$table->string('photo', 100)->nullable();
			$table->enum('gender', ['Masculino', 'Feminino']);
			$table->date('date_of_birth');
			$table->string('marital_status', 15);
			$table->string('document_type', 30);
			$table->string('document_number', 30);
			$table->string('nif', 20)->nullable()->unique();
			$table->string('social_security', 20)->nullable()->unique();
			$table->integer('dependents')->nullable()->default(0);
			$table->string('education_degree', 50);
			$table->string('phone', 15);
			$table->string('phone2', 15)->nullable();
			$table->unsignedBigInteger('country_id')->nullable();
			$table->unsignedBigInteger('province_id')->nullable();
			$table->unsignedBigInteger('municipality_id')->nullable();
			$table->string('address', 150)->nullable();
			$table->string('department', 50)->nullable();
			$table->string('position', 50)->nullable();
			$table->double('base_salary', 16, 3)->nullable();
			$table->double('meal_allowance', 16, 3)->nullable();
			$table->double('productivity_allowance', 16, 3)->nullable();
			$table->double('transportation_allowance', 16, 3)->nullable();
			$table->double('family_allowance', 16, 3)->nullable();
			$table->date('hire_date');
			$table->date('contract_end_date')->nullable();
			$table->string('bank_name', 30)->nullable();
			$table->string('iban', 50)->nullable()->unique();
			$table->string('account_number', 30)->nullable();
			$table->boolean('can_login')->default(false);
			$table->enum('role', [User::ROLE_ADMIN, User::ROLE_USER])->nullable()->default(User::ROLE_USER);
			$table->string('user_name', 64)->nullable()->unique();
			$table->string('password', 64)->nullable();
			$table->timestamp('email_verified_at')->nullable();
			$table->rememberToken();
			$table->unsignedBigInteger('user_id')->nullable();
			$table->unsignedBigInteger('user_id_update')->nullable();
			$table->foreignId('gym_id')->nullable()->references('id')->on('gyms')->cascadeOnUpdate()->nullOnDelete();

			$table->timestamps();

			$table->unique(['document_type', 'document_number']);
			$table->unique(['bank_name', 'account_number']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_USERS);
	}
};
