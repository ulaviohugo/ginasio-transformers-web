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
		Schema::create(DBHelper::TB_MUNICIPALITIES, function (Blueprint $table) {
			$table->id();
			$table->foreignId('province_id')->references('id')->on(DBHelper::TB_PROVINCES)->cascadeOnUpdate()->cascadeOnDelete();;
			$table->string('name', 30);

			$table->unique(['province_id', 'name']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_MUNICIPALITIES);
	}
};
