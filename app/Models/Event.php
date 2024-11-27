<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property array|null $location
 * @property Carbon $date
 * @property string|null $venue
 * @property int|null $idol_id
 * @property int|null $group_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read MediaCollection<int, Media> $media
 * @property-read int|null $media_count
 * @method static Builder<static>|Event newModelQuery()
 * @method static Builder<static>|Event newQuery()
 * @method static Builder<static>|Event onlyTrashed()
 * @method static Builder<static>|Event query()
 * @method static Builder<static>|Event whereCreatedAt($value)
 * @method static Builder<static>|Event whereDate($value)
 * @method static Builder<static>|Event whereDeletedAt($value)
 * @method static Builder<static>|Event whereGroupId($value)
 * @method static Builder<static>|Event whereId($value)
 * @method static Builder<static>|Event whereIdolId($value)
 * @method static Builder<static>|Event whereLocation($value)
 * @method static Builder<static>|Event whereName($value)
 * @method static Builder<static>|Event whereUpdatedAt($value)
 * @method static Builder<static>|Event whereVenue($value)
 * @method static Builder<static>|Event withTrashed()
 * @method static Builder<static>|Event withoutTrashed()
 * @mixin Eloquent
 */
class Event extends Model implements HasMedia
{
    use SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'name',
        'location',
        'date',
        'venue',
    ];

    protected function casts(): array
    {
        return [
            'location' => 'array',
            'date' => 'date',
        ];
    }
}
