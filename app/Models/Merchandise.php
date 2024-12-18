<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Merchandise extends Model
{
    use SoftDeletes;

    /** @var array<string, string> */
    protected $guarded = [];

    /** @var array<string, string> */
    protected function casts(): array
    {
        return [
            'available' => 'boolean',
            'release_date' => 'date',
        ];
    }

    /** @return MorphTo<Model> */
    public function merchandiseable(): MorphTo
    {
        return $this->morphTo();
    }
}
