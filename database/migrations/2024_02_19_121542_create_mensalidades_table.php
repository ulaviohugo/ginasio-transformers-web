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
        Schema::create('mensalidades', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
			$table->integer('month');
            $table->integer('monthlyValue');
            $table->integer('monthlyFine')->nullable();
            $table->string('paymentMethod');
            $table->foreignId('athlete_id')->nullable()->references('id')->on(DBHelper::TB_ATHLETE);
            $table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS);
            $table->timestamps();

            $table->unique(['athlete_id', 'year', 'month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensalidades');
    }
};
