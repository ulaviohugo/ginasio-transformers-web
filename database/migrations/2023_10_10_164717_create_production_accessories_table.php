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
		Schema::create('production_accessories', function (Blueprint $table) {
			$table->id();
			$table->foreignId('production_id')->nullable()->references('id')->on(DBHelper::TB_PRODUCTION_BUDGETS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->foreignId('accessory_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->integer('quantity');
			$table->double('price', 16, 3);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('production_accessories');
	}
};
