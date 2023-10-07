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
		Schema::create(DBHelper::TB_TRANSACTIONS, function (Blueprint $table) {
			$table->id();
			$table->string('description');
			$table->string('operation_type');
			$table->decimal('amount', 65, 3);
			$table->string('payment_method', 50);
			$table->dateTime('date');
			$table->foreignId('cash_register_id')->nullable()->references('id')->on(DBHelper::TB_CASH_REGISTERS)->cascadeOnUpdate()->nullOnDelete();
			$table->decimal('post_movement_balance', 65, 3)->default(0);
			$table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('update_by_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_TRANSACTIONS);
	}
};