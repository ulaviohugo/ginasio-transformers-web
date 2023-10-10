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
		Schema::create(DBHelper::TB_SUPPLIER_PRODUCTS, function (Blueprint $table) {
			$table->id();
			$table->foreignId('supplier_id')->references('id')->on(DBHelper::TB_SUPPLIERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->foreignId('category_id')->references('id')->on(DBHelper::TB_CATEGORIES)->cascadeOnUpdate()->cascadeOnDelete();
			$table->foreignId('product_id')->references('id')->on(DBHelper::TB_PRODUCTS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->double('unit_price', 16, 3);
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
		Schema::dropIfExists(DBHelper::TB_SUPPLIER_PRODUCTS);
	}
};
