<?php

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
    Schema::create('payments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('listing_id')->constrained('properties')->onDelete('cascade');
        $table->foreignId('user_id')->constrained('general_users')->onDelete('cascade');
        $table->decimal('rent_amount', 10, 2);
        $table->decimal('total_amount', 10, 2);
        $table->string('status')->default('pending');
        $table->string('receipt_path')->nullable();
 
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
