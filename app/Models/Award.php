<?php

namespace App\Models;

use App\Enums\EventTypes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Awards extends Model
{
    protected $fillable = [
        'name',
        'description',
        'from',
        'type',
        'awardable_id',
        'awardable_type',
    ];

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
