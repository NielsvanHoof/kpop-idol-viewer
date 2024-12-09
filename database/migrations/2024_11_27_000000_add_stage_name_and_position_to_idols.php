<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('idols', function (Blueprint $table) {
            $table->string('stage_name')->nullable()->after('name');
            $table->string('position')->nullable()->after('stage_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('idols', function (Blueprint $table) {
            $table->dropColumn(['stage_name', 'position']);
        });
    }
};