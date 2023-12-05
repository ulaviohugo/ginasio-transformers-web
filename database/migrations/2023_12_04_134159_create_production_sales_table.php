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
		Schema::create(DBHelper::TB_PRODUCTION_SALES, function (Blueprint $table) {
			$table->id();
			$table->string('end_product', 100);
			$table->double('total_value', 16, 3);
			$table->double('amount_paid', 16, 3);
			$table->integer('quantity');
			$table->double('discount', 16, 3)->nullable()->default(0);
			$table->enum('paid', ['SIM', 'NÃO']);
			$table->foreignId('employee_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
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
		Schema::dropIfExists(DBHelper::TB_PRODUCTION_SALES);
	}
};
