<?php

use App\Helpers\DBHelper;
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
		Schema::create(DBHelper::TB_CUSTOMERS, function (Blueprint $table) {
			$table->id();
			$table->string('name', 50);
			$table->string('photo', 100)->nullable();
			$table->string('gender', 10);
			$table->date('date_of_birth')->nullable();
			$table->string('phone', 15)->nullable();
			$table->string('email', 50)->nullable()->unique();
			$table->foreignId('country_id')->nullable()->references('id')->on(DBHelper::TB_COUNTRIES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('province_id')->nullable()->references('id')->on(DBHelper::TB_PROVINCES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('municipality_id')->nullable()->references('id')->on(DBHelper::TB_MUNICIPALITIES)->cascadeOnUpdate()->nullOnDelete();
			$table->string('residential_address', 150)->nullable();
			$table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('user_id_update')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_CUSTOMERS);
	}
};
