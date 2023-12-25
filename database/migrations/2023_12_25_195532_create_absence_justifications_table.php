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
		Schema::create(DBHelper::TB_ABSENCE_JUSTIFICATIONS, function (Blueprint $table) {
			$table->id();
			$table->foreignId('employee_id')->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate();
			$table->string('file_path')->unique()->nullable();
			$table->date('starts_at');
			$table->date('ends_at');
			$table->integer('absent_days');
			$table->string('absence_reason');
			$table->string('absence_description')->nullable();
			$table->string('adicional_information')->nullable();
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
		Schema::dropIfExists(DBHelper::TB_ABSENCE_JUSTIFICATIONS);
	}
};
