<?php

use App\Helpers\DBHelper;
use App\Models\Supplier;
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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('nameSuppliers',50);
            $table->string('nameProduct',50);
            $table->string('descriptionProduct',100);
            $table->enum('serviceProvided',['Produtos','Equipamentos']);
            $table->enum('status', [Supplier::STATUS_ACTIVE, Supplier::STATUS_INACTIVE])->default(Supplier::STATUS_ACTIVE);
            $table->string('contactName');
            $table->string('address');
            $table->string('paymentMethod');
            $table->integer('Phone');
            $table->string('email',50);
            $table->string('site',60)->nullable();
            $table->string('purchasesHistoric');
            $table->date('deliveryTimes');
            $table->string('returnExchangePolicy');
            $table->string('contractsAgreements');
            $table->string('ratingsComments');
            $table->foreignId('user_id')->nullable()->references('id')->on(DBHelper::TB_USERS)->cascadeOnUpdate()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
