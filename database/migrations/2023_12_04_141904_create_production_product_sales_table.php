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
		Schema::create(DBHelper::TB_PRODUCTION_PRODUCT_SALES, function (Blueprint $table) {
			$table->id();
			$table->foreignId('employee_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('category_id')->nullable()->references('id')->on(DBHelper::TB_PRODUCTION_CATEGORIES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('product_id')->nullable()->references('id')->on(DBHelper::TB_PRODUCTION_PRODUCTS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('sale_id')->nullable()->references('id')->on(DBHelper::TB_PRODUCTION_SALES)->cascadeOnUpdate()->nullOnDelete();
			$table->string('color', 20)->nullable();
			$table->string('size', 30)->nullable();
			$table->string('lot', 70)->nullable();
			$table->integer('quantity');
			$table->double('unit_price', 16, 3)->default(0);
			$table->double('total_value', 16, 3);
			$table->double('amount_paid', 16, 3)->default(0);
			$table->double('balance', 16, 3)->nullable()->default(0);
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
		Schema::dropIfExists(DBHelper::TB_PRODUCTION_PRODUCT_SALES);
	}
};
