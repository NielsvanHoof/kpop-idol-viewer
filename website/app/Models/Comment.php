<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    protected $guarded = [];

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    /** @return BelongsTo<User, covariant self> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
