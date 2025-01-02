<?php

namespace App\Models;

use App\Enums\EventTypes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Event extends Model implements HasMedia
{
    use InteractsWithMedia, SoftDeletes;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'location' => 'array',
            'date' => 'date',
            'type' => EventTypes::class,
        ];
    }

    /** @return Builder<static> */
    public function scopeConcert(Builder $query): Builder
    {
        return $query->where('type', EventTypes::CONCERT);
    }

    /** @return Builder<static> */
    public function scopeSigning(Builder $query): Builder
    {
        return $query->where('type', EventTypes::SIGNING);
    }

    /** @return Builder<static> */
    public function scopeFanMeeting(Builder $query): Builder
    {
        return $query->where('type', EventTypes::FANMEETING);
    }

    /** @return Builder<static> */
    public function scopeOther(Builder $query): Builder
    {
        return $query->where('type', EventTypes::OTHER);
    }

    public function eventable(): MorphTo
    {
        return $this->morphTo();
    }
}
