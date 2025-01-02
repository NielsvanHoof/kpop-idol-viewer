<?php

use App\Enums\GroupTypes;
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
        Schema::table('groups', function (Blueprint $table) {
            $table->enum('type', GroupTypes::values())->nullable();
            $table->string('agency')->nullable();
            $table->string('fandom_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropColumn('agency');
            $table->dropColumn('fandom_name');
        });
    }
};
