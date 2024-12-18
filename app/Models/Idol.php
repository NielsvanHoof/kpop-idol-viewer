<?php

namespace App\Models;

use App\Enums\MediaTypes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Idol extends Model implements HasMedia
{
    use HasFactory, HasSlug, InteractsWithMedia, SoftDeletes;

    /** @var array<string, string> */
    protected $guarded = [];

    /** @return array<string, string> */
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

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover_photos')->singleFile()->withResponsiveImages();

        $this->addMediaCollection('gallery')->withResponsiveImages();
    }

    /** @return Attribute<array<string, string>, never> */
    protected function coverPhoto(): Attribute
    {
        return Attribute::make(
            get: fn () => [
                'url' => $this->getFirstMediaUrl('cover_photos'),
                'type' => $this->getMedia('cover_photos')->first()?->getCustomProperty('type') ?? MediaTypes::CONCEPT->value,
            ] ?? null,
        );
    }

    /** @return Attribute<array<string, string>, never> */
    protected function backgroundImage(): Attribute
    {
        return Attribute::make(
            get: fn () => [
                 
                'url' => $this->getFirstMediaUrl('background_images'),
                'type' => $this->getMedia('background_images')->first()?->getCustomProperty('type') ?? MediaTypes::CONCEPT->value,
            ] ?? null,
        );
    }

    /** @return Attribute<array<string, string>, never> */
    protected function gallery(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getMedia('gallery')->map(fn (Media $media) => [
                'url' => $media->getUrl(),
                'type' => $media->getCustomProperty('type') ?? MediaTypes::PHOTOSHOOT->value,
            ])->toArray(),
        );
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /** @return BelongsTo<Group> */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    /** @return MorphMany<Merchandise> */
    public function merchandises(): MorphMany
    {
        return $this->morphMany(Merchandise::class, 'merchandiseable');
    }

    /** @return MorphMany<Follower> */
    public function followers(): MorphMany
    {
        return $this->morphMany(Follower::class, 'followable')->chaperone();
    }

    /** @return MorphMany<Like> */
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable')->chaperone();
    }

    /** @return MorphMany<Event> */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'eventable')->chaperone();
    }

    /** @return MorphMany<RecentlyViewed> */
    public function views(): MorphMany
    {
        return $this->morphMany(RecentlyViewed::class, 'viewable')->chaperone();
    }

    /** @return MorphMany<Award> */
    public function awards(): MorphMany
    {
        return $this->morphMany(Award::class, 'awardable')->chaperone();
    }

    /** @return MorphOne<Genre> */
    public function genre(): MorphOne
    {
        return $this->morphOne(Genre::class, 'genreable');
    }
}
