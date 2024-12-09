<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property float $price
 * @property bool $available
 * @property Carbon $release_date
 * @property string $merchandiseable_type
 * @property int $merchandiseable_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read Model|Eloquent $merchandiseable
 * @method static Builder<static>|Merchandise newModelQuery()
 * @method static Builder<static>|Merchandise newQuery()
 * @method static Builder<static>|Merchandise onlyTrashed()
 * @method static Builder<static>|Merchandise query()
 * @method static Builder<static>|Merchandise whereAvailable($value)
 * @method static Builder<static>|Merchandise whereCreatedAt($value)
 * @method static Builder<static>|Merchandise whereDeletedAt($value)
 * @method static Builder<static>|Merchandise whereDescription($value)
 * @method static Builder<static>|Merchandise whereId($value)
 * @method static Builder<static>|Merchandise whereMerchandiseableId($value)
 * @method static Builder<static>|Merchandise whereMerchandiseableType($value)
 * @method static Builder<static>|Merchandise whereName($value)
 * @method static Builder<static>|Merchandise wherePrice($value)
 * @method static Builder<static>|Merchandise whereReleaseDate($value)
 * @method static Builder<static>|Merchandise whereUpdatedAt($value)
 * @method static Builder<static>|Merchandise withTrashed()
 * @method static Builder<static>|Merchandise withoutTrashed()
 * @mixin Eloquent
 */
class Merchandise extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'available',
        'release_date',
        'merchandiseable_id',
        'merchandiseable_type',
    ];

    protected function casts(): array
    {
        return [
            'available' => 'boolean',
            'release_date' => 'date',
        ];
    }

    public function merchandiseable(): MorphTo
    {
        return $this->morphTo();
    }
}
