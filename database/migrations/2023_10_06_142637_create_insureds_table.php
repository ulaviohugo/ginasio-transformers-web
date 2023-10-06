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
		Schema::create(DBHelper::TB_INSUREDS, function (Blueprint $table) {
			$table->id();
			$table->string('name', 50);
			$table->foreignId('policyholder_id')->nullable()->references('id')->on(DBHelper::TB_INSUREDS)->cascadeOnUpdate()->nullOnDelete();
			$table->string('gender', 10);
			$table->string('marital_status', 15)->nullable();
			$table->string('card_name', 50)->nullable();
			$table->string('card_number', 20)->nullable();
			$table->dateTime('date_of_birth');
			$table->string('document_type');
			$table->string('document_number');
			$table->dateTime('document_issue_date')->nullable();
			$table->string('nif', 50)->nullable();
			$table->integer('dependents')->default(0);
			$table->string('occupation', 50)->nullable();
			$table->foreignId('province_id')->nullable()->references('id')->on(DBHelper::TB_PROVINCES)->cascadeOnUpdate()->nullOnDelete();
			$table->foreignId('municipality_id')->nullable()->references('id')->on(DBHelper::TB_MUNICIPALITIES)->cascadeOnUpdate()->nullOnDelete();
			$table->string('address')->nullable();
			$table->string('neighborhood')->nullable();
			$table->string('email', 100)->nullable();
			$table->string('phone', 15)->nullable();
			$table->string('phone2', 15)->nullable();
			$table->string('comercial', 50)->nullable();
			$table->dateTime('enrollment_date')->nullable();
			$table->dateTime('renewal_date')->nullable();
			$table->string('plan', 50)->nullable();
			$table->string('policy', 50)->nullable();
			$table->string('proposal_type', 20)->nullable();
			$table->string('proposal_number', 25)->nullable();
			$table->string('proposal_currency', 5)->nullable();
			$table->string('mediator', 50)->nullable();
			$table->string('policy_number', 50)->nullable();
			$table->string('payment_frequency', 15)->nullable();
			$table->string('payment_method', 30)->nullable();
			$table->enum('student', ['SIM', 'NÃO']);
			$table->string('relationship', 15)->nullable();
			$table->string('review', 15)->nullable();
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
		Schema::dropIfExists(DBHelper::TB_INSUREDS);
	}
};
