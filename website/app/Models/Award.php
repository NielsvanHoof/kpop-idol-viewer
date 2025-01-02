<?php

namespace App\Models;

use App\Enums\EventTypes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Award extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'from' => 'date',
            'type' => EventTypes::class,
        ];
    }

    public function awardable(): MorphTo
    {
        return $this->morphTo();
    }
}
