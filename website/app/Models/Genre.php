<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Genre extends Model
{
    protected $guarded = [];

    public function genreable(): MorphTo
    {
        return $this->morphTo();
    }
}
