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
		Schema::create(DBHelper::TB_ADMISSIONS, function (Blueprint $table) {
			$table->id();
			$table->foreignId('employee_id')->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate();
			$table->string('file_path')->unique()->nullable();
			$table->json('working_tools');
			$table->json('clothes_production_training');
			$table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS);
			$table->foreignId('user_id_update')->nullable()->references('id')->on(DBHelper::TB_USERS);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_ADMISSIONS);
	}
};
