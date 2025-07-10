<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends \Illuminate\Database\Migrations\Migration {
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->text('terms_of_service')->nullable();
            $table->string('contact_info')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn(['terms_of_service', 'contact_info']);
        });
    }
};

