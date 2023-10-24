<?php

use App\Helpers\DBHelper;
use App\Models\EmployeePresence;
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
		Schema::create(DBHelper::TB_EMPLOYEE_PRESENCES, function (Blueprint $table) {
			$table->id();
			$table->foreignId('employee_id')->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->cascadeOnDelete();
			$table->date('date');
			$table->time('entry_time')->nullable();
			$table->time('exit_time')->nullable();
			$table->time('delay_duration')->nullable();
			$table->enum('presence_status', [EmployeePresence::PRESENT, EmployeePresence::ABSENT]);
			$table->string('description', 100)->nullable();
			$table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('user_id_update')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
			$table->timestamps();

			$table->unique(['employee_id', 'date']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(DBHelper::TB_EMPLOYEE_PRESENCES);
	}
};
