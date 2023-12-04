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
		Schema::create(DBHelper::TB_PRODUCTION_PRODUCTS, function (Blueprint $table) {
			$table->id();
			$table->string('name', 70);
			$table->string('photo', 100)->nullable();
			$table->foreignId('category_id')->references('id')->on(DBHelper::TB_PRODUCTION_CATEGORIES)->cascadeOnUpdate()->noActionOnDelete();
			$table->string('color')->nullable();
			$table->string('size')->nullable();
			$table->integer('min_stock')->nullable();
			$table->integer('max_stock')->nullable();
			$table->double('purchase_price', 16, 3)->nullable();
			$table->double('selling_price', 16, 3)->nullable();
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
		Schema::dropIfExists(DBHelper::TB_PRODUCTION_PRODUCTS);
	}
};
