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
		Schema::create(DBHelper::TB_STOCK, function (Blueprint $table) {
			$table->id();
			$table->string('photo', 100)->nullable();
			$table->string('bar_code', 70)->nullable();
			$table->foreignId('supplier_id')->nullable()->references('id')->on(DBHelper::TB_SUPPLIERS)->cascadeOnUpdate()->noActionOnDelete();
			$table->foreignId('category_id')->references('id')->on(DBHelper::TB_CATEGORIES)->cascadeOnUpdate()->noActionOnDelete();
			$table->foreignId('product_id')->references('id')->on(DBHelper::TB_PRODUCTS)->cascadeOnUpdate()->noActionOnDelete();
			$table->string('color', 20)->nullable();
			$table->string('size', 20)->nullable();
			$table->double('unit_price', 16, 3);
			$table->integer('quantity');
			$table->integer('initial_quantity')->default(0);
			$table->double('total_value', 16, 3);
			$table->string('payment_method', 30);
			$table->enum('paid', ['SIM', 'NÃO']);
			$table->date('purchase_date');
			$table->date('due_date')->nullable();
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
		Schema::dropIfExists(DBHelper::TB_STOCK);
	}
};
