<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class RecentlyViewed extends Model
{
    protected $table = 'recently_viewed';

    protected $guarded = [];

    public function viewable(): MorphTo
    {
        return $this->morphTo();
    }

    /** @return BelongsTo<User, covariant self> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
