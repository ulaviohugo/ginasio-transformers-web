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
		Schema::create(DBHelper::TB_REFUNDS, function (Blueprint $table) {
			$table->id();
			$table->foreignId('customer_id')->nullable()->references('id')->on(DBHelper::TB_CUSTOMERS)->cascadeOnUpdate();
			$table->string('file_path');
			$table->string('purchase_date');
			$table->foreignId('category_id')->nullable()->references('id')->on(DBHelper::TB_CATEGORIES)->cascadeOnUpdate();
			$table->foreignId('product_id')->nullable()->references('id')->on(DBHelper::TB_PRODUCTS)->cascadeOnUpdate();
			$table->string('phone');
			$table->string('email');
			$table->foreignId('province_id')->nullable()->references('id')->on(DBHelper::TB_PROVINCES)->cascadeOnUpdate();
			$table->foreignId('municipality_id')->nullable()->references('id')->on(DBHelper::TB_MUNICIPALITIES)->cascadeOnUpdate();
			$table->string('iban');
			$table->double('amount', 16, 3);
			$table->string('description');
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
		Schema::dropIfExists(DBHelper::TB_REFUNDS);
	}
};
