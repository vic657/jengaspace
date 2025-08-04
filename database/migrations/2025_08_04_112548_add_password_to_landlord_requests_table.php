<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('landlord_requests', function (Blueprint $table) {
        $table->string('password')->after('email'); // You can place it where you prefer
    });
}

public function down()
{
    Schema::table('landlord_requests', function (Blueprint $table) {
        $table->dropColumn('password');
    });
}

};
