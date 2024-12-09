<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
 * @property Carbon $debute_date
 * @property bool $active
 * @property array|null $social_links
 * @property int|null $group_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property string $slug
 * @property Carbon|null $birth_date
 * @property-read mixed $cover_photo
 * @property-read Collection<int, Event> $events
 * @property-read int|null $events_count
 * @property-read mixed $gallery
 * @property-read mixed $rating
 * @property-read Group|null $group
 * @property-read MediaCollection<int, Media> $media
 * @property-read int|null $media_count
 * @method static Builder<static>|Idol newModelQuery()
 * @method static Builder<static>|Idol newQuery()
 * @method static Builder<static>|Idol onlyTrashed()
 * @method static Builder<static>|Idol query()
 * @method static Builder<static>|Idol whereActive($value)
 * @method static Builder<static>|Idol whereBio($value)
 * @method static Builder<static>|Idol whereBirthDate($value)
 * @method static Builder<static>|Idol whereCreatedAt($value)
 * @method static Builder<static>|Idol whereDebuteDate($value)
 * @method static Builder<static>|Idol whereDeletedAt($value)
 * @method static Builder<static>|Idol whereGroupId($value)
 * @method static Builder<static>|Idol whereId($value)
 * @method static Builder<static>|Idol whereName($value)
 * @method static Builder<static>|Idol whereSlug($value)
 * @method static Builder<static>|Idol whereSocialLinks($value)
 * @method static Builder<static>|Idol whereUpdatedAt($value)
 * @method static Builder<static>|Idol withTrashed()
 * @method static Builder<static>|Idol withoutTrashed()
 * @property-read Collection<int, Merchandise> $merchandises
 * @property-read int|null $merchandises_count
 * @property string|null $stage_name
 * @property string|null $position
 * @property string|null $spotify_id
 * @method static Builder<static>|Idol wherePosition($value)
 * @method static Builder<static>|Idol whereStageName($value)
 * @method static Builder<static>|Idol whereSpotifyId($value)
 * @property-read Collection<int, Follower> $followers
 * @property-read int|null $followers_count
 * @mixin Eloquent
 */
class Idol extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'name',
        'stage_name',
        'position',
        'bio',
        'debute_date',
        'active',
        'social_links',
        'group_id',
        'slug',
        'birth_date',
        'spotify_id',
    ];

    protected function casts(): array
    {
        return [
            'debute_date' => 'date',
            'birth_date' => 'date',
            'active' => 'boolean',
            'social_links' => 'json',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /** @return Attribute<string, never> */
    protected function coverPhoto(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getFirstMediaUrl('cover_photos'),
        );
    }

    /** @return Attribute<string, never> */
    protected function gallery(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getMedia('gallery')->map(fn ($media) => $media->getUrl()),
        );
    }
    //
    //    /** @return Attribute<int, never> */
    //    protected function rating(): Attribute
    //    {
    //        return Attribute::make(
    //            get: fn () => ($this->followers + $this->load('events')->events->count()) / 2,
    //        );
    //    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'idol_id');
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
