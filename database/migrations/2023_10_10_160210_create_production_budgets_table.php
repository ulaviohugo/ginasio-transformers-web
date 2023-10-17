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
		Schema::create(DBHelper::TB_PRODUCTION_BUDGETS, function (Blueprint $table) {
			$table->id();

			$table->string('end_product');
			$table->date('date');
			$table->string('photo')->nullable();
			$table->foreignId('customer_id')->nullable()->references('id')->on(DBHelper::TB_CUSTOMERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->string('customer_rating')->nullable();
			$table->foreignId('cutting_employee_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->double('cutting_cost', 16, 3);
			$table->integer('cutting_duration_per_minute');
			$table->foreignId('sewing_employee_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->double('sewing_cost', 16, 3);
			$table->integer('sewing_duration_per_minute');
			$table->double('variable_cost', 16, 3);
			$table->double('finishing_cost', 16, 3);
			$table->double('production_cost', 16, 3);
			$table->double('selling_cost', 16, 3);
			$table->double('discount', 16, 3);
			$table->double('total_to_pay', 16, 3);
			$table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->foreignId('user_id_update')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_PRODUCTION_BUDGETS);
	}
};
