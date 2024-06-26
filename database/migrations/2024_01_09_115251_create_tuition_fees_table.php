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
		Schema::create(DBHelper::TB_TUITION_FEES, function (Blueprint $table) {
			$table->id();
			$table->foreignId('athlete_id')->references('id')->on(DBHelper::TB_ATHLETE)->cascadeOnUpdate();
			$table->integer('year');
			$table->integer('month');
			$table->double('amount', 8, 2);
			$table->double('fine', 8, 2)->nullable();
			$table->string('file_path')->nullable();
			$table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('user_id_update')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();

			$table->timestamps();

			$table->unique(['athlete_id', 'year', 'month']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_TUITION_FEES);
	}
};
