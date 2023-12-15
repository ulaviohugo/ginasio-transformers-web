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
		Schema::create(DBHelper::TB_SALARY_RECEIPTS, function (Blueprint $table) {
			$table->id();
			$table->foreignId('employee_id')->references('id')->on(DBHelper::TB_USERS);
			$table->string('file_path')->nullable();
			$table->integer('work_days');
			$table->integer('year');
			$table->integer('month');
			$table->string('observation')->nullable();
			$table->double('base_salary', 16, 3);
			$table->double('base_salary_received', 16, 3);
			$table->double('net_salary', 16, 3);
			$table->double('gross_salary', 16, 3);
			$table->double('meal_allowance', 16, 3)->nullable();
			$table->double('productivity_allowance', 16, 3)->nullable();
			$table->double('transportation_allowance', 16, 3)->nullable();
			$table->double('family_allowance', 16, 3)->nullable();
			$table->double('christmas_allowance', 16, 3)->nullable()->comment('13th salary');
			$table->double('holiday_allowance', 16, 3)->nullable();
			$table->double('total_salary_discounts', 16, 3);
			$table->double('inss_discount', 16, 3);
			$table->integer('inss_discount_percent')->nullable()->default(0);
			$table->double('irt_discount', 16, 3);
			$table->integer('irt_discount_percent')->nullable()->default(0);


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
		Schema::dropIfExists(DBHelper::TB_SALARY_RECEIPTS);
	}
};
