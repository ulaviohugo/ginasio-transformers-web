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
		Schema::create(DBHelper::TB_SALES, function (Blueprint $table) {
			$table->id();
			$table->foreignId('customer_id')->nullable()->references('id')->on(DBHelper::TB_CUSTOMERS)->cascadeOnUpdate()->nullOnDelete();
			$table->double('total_value', 16, 3);
			$table->double('amount_paid', 16, 3);
			$table->double('discount', 16, 3)->nullable()->default(0);
			$table->foreignId('employee_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->string('payment_method', 50);
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
		Schema::dropIfExists(DBHelper::TB_SALES);
	}
};
