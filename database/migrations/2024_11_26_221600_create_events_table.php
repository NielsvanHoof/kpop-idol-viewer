<?php

use App\Models\Group;
use App\Models\Idol;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->jsonb('location')->nullable();
            $table->date('date');
            $table->string('venue')->nullable();
            $table->foreignIdFor(Idol::class)->nullable()->constrained()->nullOnDelete();
            $table->foreignIdFor(Group::class)->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
