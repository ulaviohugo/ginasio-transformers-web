<?php

use App\Helpers\DBHelper;
use App\Models\Athlete;
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
		Schema::create(DBHelper::TB_ATHLETE, function (Blueprint $table) {
			$table->id();
			$table->string('name', 50);
			$table->date('date_of_birth');
			$table->enum('gender', ['Masculino', 'Feminino']);
			$table->string('marital_status', 15);
			$table->string('document_type', 30)->nullable();
			$table->string('document_number', 30)->nullable();
			$table->string('photo', 100)->nullable();
			$table->string('phone', 15);
			$table->string('phone2', 15)->nullable();
			$table->string('email', 50)->unique()->nullable();
			$table->string('observation')->nullable();
			$table->string('health_history')->nullable();
			$table->string('education_degree', 50)->nullable();
			$table->double('starting_weight', 5, 2)->nullable();
			$table->double('current_weight', 5, 2)->nullable();
			$table->double('goal_weight', 5, 2)->nullable();
			$table->enum('status', [Athlete::STATUS_ACTIVE, Athlete::STATUS_INACTIVE])->default(Athlete::STATUS_ACTIVE);
			$table->foreignId('country_id')->nullable()->references('id')->on(DBHelper::TB_COUNTRIES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('province_id')->nullable()->references('id')->on(DBHelper::TB_PROVINCES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('municipality_id')->nullable()->references('id')->on(DBHelper::TB_MUNICIPALITIES)->cascadeOnUpdate()->nullOnDelete();
			$table->string('address', 150)->nullable();
			$table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('user_id_update')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('gym_id')->nullable()->references('id')->on('gyms')->cascadeOnUpdate()->nullOnDelete();
			
			$table->timestamps();

			$table->unique(['document_type', 'document_number']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_ATHLETE);
	}
};
