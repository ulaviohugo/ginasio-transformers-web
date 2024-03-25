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
        Schema::create('aulas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tipo');
            $table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS);
            $table->foreignId('gym_id')->nullable()->references('id')->on('gyms')->cascadeOnUpdate()->nullOnDelete();
            $table->date('data');
            $table->time('horario');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aulas');
    }
};
