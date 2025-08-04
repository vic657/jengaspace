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
        $table->integer('registration_fee')->default(0);
    });
}

public function down()
{
    Schema::table('landlord_requests', function (Blueprint $table) {
        $table->dropColumn('registration_fee');
    });
}

};
