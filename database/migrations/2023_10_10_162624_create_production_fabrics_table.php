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
		Schema::create(DBHelper::TB_PRODUCTION_FABRICS, function (Blueprint $table) {
			$table->id();
			$table->foreignId('production_id')->nullable()->references('id')->on(DBHelper::TB_PRODUCTION_BUDGETS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->foreignId('fabric_id')->nullable()->references('id')->on(DBHelper::TB_FABRICS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->string('color', 16);
			$table->integer('meters');
			$table->double('cost', 16, 3);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_PRODUCTION_FABRICS);
	}
};
