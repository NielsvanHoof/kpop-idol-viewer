<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('idols', function (Blueprint $table) {
            $table->dropColumn('followers');
        });
    }

    public function down(): void
    {
        Schema::table('idols', function (Blueprint $table) {
            $table->integer('followers')->default(0);
        });
    }
};
