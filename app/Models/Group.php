<?php

namespace App\Models;

use App\Enums\GroupTypes;
use App\Enums\MediaTypes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Group extends Model implements HasMedia
{
    use HasFactory, HasSlug, InteractsWithMedia, SoftDeletes;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'debute_date' => 'date',
            'social_links' => 'array',
            'type' => GroupTypes::class,
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

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover_photos')->singleFile()->withResponsiveImages();

        $this->addMediaCollection('gallery')->withResponsiveImages();
    }

    /** @return Attribute<string,never> */
    protected function coverPhoto(): Attribute
    {
        return Attribute::make(
            get: fn($value, array $attributes) => [
                'url' => $this->getFirstMediaUrl('cover_photos'),
                'type' => $this->getMedia('cover_photos')->first()?->getCustomProperty('type'),
            ],
        );
    }

    /** @return Attribute<string,never> */
    protected function backgroundVideo(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Storage::disk('public')->url($value),
        );
    }

    /** @return Attribute<array<array-key, array<array-key, string>>,never> */
    protected function gallery(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->getMedia('gallery')->map(
                fn(Media $media) => [
                    'url' => $media->getUrl(),
                    'date' => $media->created_at,
                    'type' => $media->getCustomProperty('type') ?? MediaTypes::PHOTOSHOOT->value,
                ],
            )->toArray(),
        );
    }

    /** @return HasMany<Idol, covariant self> */
    public function idols(): HasMany
    {
        return $this->hasMany(Idol::class, 'group_id');
    }

    /** @return MorphMany<Merchandise, covariant self> */
    public function merchandises(): MorphMany
    {
        return $this->morphMany(Merchandise::class, 'merchandiseable');
    }

    /** @return MorphMany<Follower, covariant self> */
    public function followers(): MorphMany
    {
        return $this->morphMany(Follower::class, 'followable')->chaperone();
    }

    /** @return MorphMany<Like, covariant self> */
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable')->chaperone();
    }

    /** @return MorphMany<Event, covariant self> */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'eventable')->chaperone();
    }

    /** @return MorphMany<RecentlyViewed, covariant self> */
    public function views(): MorphMany
    {
        return $this->morphMany(RecentlyViewed::class, 'viewable')->chaperone();
    }

    /** @return MorphMany<Award, covariant self> */
    public function awards(): MorphMany
    {
        return $this->morphMany(Award::class, 'awardable')->chaperone();
    }

    /** @return MorphOne<Genre, covariant self> */
    public function genre(): MorphOne
    {
        return $this->morphOne(Genre::class, 'genreable');
    }
}
