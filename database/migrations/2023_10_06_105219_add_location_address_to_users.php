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
		Schema::table(DBHelper::TB_USERS, function (Blueprint $table) {
			$table->foreign('country_id')->references('id')->on(DBHelper::TB_COUNTRIES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreign('province_id')->references('id')->on(DBHelper::TB_PROVINCES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreign('municipality_id')->references('id')->on(DBHelper::TB_MUNICIPALITIES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreign('user_id')->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreign('user_id_update')->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table(DBHelper::TB_USERS, function (Blueprint $table) {
			//
		});
	}
};
