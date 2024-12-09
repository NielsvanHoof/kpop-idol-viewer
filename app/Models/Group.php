<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $bio
 * @property bool $active
 * @property Carbon $debute_date
 * @property array|null $social_links
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property string $slug
 * @property string|null $spotify_id
 * @property-read Collection<int, Event> $events
 * @property-read int|null $events_count
 * @property-read Collection<int, Idol> $idols
 * @property-read int|null $idols_count
 * @property-read MediaCollection<int, Media> $media
 * @property-read int|null $media_count
 * @method static Builder<static>|Group newModelQuery()
 * @method static Builder<static>|Group newQuery()
 * @method static Builder<static>|Group onlyTrashed()
 * @method static Builder<static>|Group query()
 * @method static Builder<static>|Group whereActive($value)
 * @method static Builder<static>|Group whereBio($value)
 * @method static Builder<static>|Group whereCreatedAt($value)
 * @method static Builder<static>|Group whereDebuteDate($value)
 * @method static Builder<static>|Group whereDeletedAt($value)
 * @method static Builder<static>|Group whereId($value)
 * @method static Builder<static>|Group whereName($value)
 * @method static Builder<static>|Group whereSlug($value)
 * @method static Builder<static>|Group whereSocialLinks($value)
 * @method static Builder<static>|Group whereUpdatedAt($value)
 * @method static Builder<static>|Group withTrashed()
 * @method static Builder<static>|Group withoutTrashed()
 * @property-read mixed $cover_photo
 * @property-read Collection<int, Merchandise> $merchandises
 * @property-read int|null $merchandises_count
 * @property-read Collection<int, Follower> $followers
 * @property-read int|null $followers_count
 * @method static Builder<static>|Group whereSpotifyId($value)
 * @mixin Eloquent
 */
class Group extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'name',
        'bio',
        'active',
        'debute_date',
        'social_links',
        'slug',
        'spotify_id',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'debute_date' => 'date',
            'social_links' => 'array',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /** @return Attribute<string,never> */
    protected function coverPhoto(): Attribute
    {
        return Attribute::make(
            get: fn ($value, array $attributes) => $this->getFirstMediaUrl('cover_photos'),
        );
    }

    public function idols(): HasMany
    {
        return $this->hasMany(Idol::class, 'group_id');
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'group_id');
    }

    public function merchandises(): MorphMany
    {
        return $this->morphMany(Merchandise::class, 'merchandiseable');
    }

    public function followers(): MorphMany
    {
        return $this->morphMany(Follower::class, 'followable');
    }
}
