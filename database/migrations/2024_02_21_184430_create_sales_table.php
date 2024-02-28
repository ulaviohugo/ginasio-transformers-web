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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('paymentMethod');
            $table->double('unitPrice');
            $table->double('totalPrice');
            $table->integer('quantity');
            $table->foreignId('athlete_id')->nullable()->references('id')->on(DBHelper::TB_ATHLETE);
            $table->foreignId('produto_id')->references('id')->on('products');
            $table->foreignId('user_id')->references('id')->on(DBHelper::TB_USERS);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
