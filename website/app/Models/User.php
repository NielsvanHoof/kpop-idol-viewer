<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /** @return Attribute<string,never> */
    protected function profilePhoto(): Attribute
    {
        return Attribute::make(
            get: fn () => 'https://ui-avatars.com/api/?rounded=true&name='.urlencode($this->name).'&color=7F9CF5&background=EBF4FF'
        );
    }

    /** @return Builder<self> */
    public function scopeRecentlyViewedIdols(Builder $query, User $user): Builder
    {
        return $query->whereHas('recentlyViewed', function (Builder $query) use ($user) {
            $query->where('user_id', $user->id);
        });
    }

    /** @return HasManyThrough<Idol, Like, covariant self> */
    public function likedIdols(): HasManyThrough
    {
        return $this->hasManyThrough(
            Idol::class,
            Like::class,
            'user_id',
            'id',
            'id',
            'likeable_id'
        );
    }

    /** @return HasManyThrough<Group, Like, covariant self> */
    public function likedGroups(): HasManyThrough
    {
        return $this->hasManyThrough(
            Group::class,
            Like::class,
            'user_id',
            'id',
            'id',
            'likeable_id'
        );
    }

    /** @return HasManyThrough<Idol, Follower, covariant self> */
    public function followedIdols(): HasManyThrough
    {
        return $this->hasManyThrough(
            Idol::class,
            Follower::class,
            'user_id',
            'id',
            'id',
            'followable_id'
        );
    }

    /** @return HasManyThrough<Group, Follower, covariant self> */
    public function followedGroups(): HasManyThrough
    {
        return $this->hasManyThrough(
            Group::class,
            Follower::class,
            'user_id',
            'id',
            'id',
            'followable_id'
        );
    }

    /** @return HasMany<RecentlyViewed, covariant self> */
    public function recentlyViewed(): HasMany
    {
        return $this->hasMany(RecentlyViewed::class, 'user_id');
    }

    /** @return HasMany<Comment, covariant self> */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
