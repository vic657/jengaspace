<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('category'); // bedsitter, one-bedroom, etc.
            $table->integer('bedrooms')->nullable(); // only used for own compound
            $table->string('location');
            $table->decimal('rent', 10, 2);
            $table->text('description')->nullable();
            $table->string('living_room_image')->nullable();
            $table->string('bedroom_image')->nullable();
            $table->string('kitchen_image')->nullable();
            $table->string('bathroom_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
