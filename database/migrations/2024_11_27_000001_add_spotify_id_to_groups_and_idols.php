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
        Schema::table('groups', function (Blueprint $table) {
            $table->string('spotify_id')->nullable()->after('slug');
        });

        Schema::table('idols', function (Blueprint $table) {
            $table->string('spotify_id')->nullable()->after('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->dropColumn('spotify_id');
        });

        Schema::table('idols', function (Blueprint $table) {
            $table->dropColumn('spotify_id');
        });
    }
}; 