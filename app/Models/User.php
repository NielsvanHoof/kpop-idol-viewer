<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
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

    /** @var array<string, string> */
    protected $guarded = [];

    /** @var array<string, string> */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
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

    /** @return HasManyThrough<Like> */
    public function likes(): HasManyThrough
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

    /** @return HasManyThrough<Follower> */
    public function follows(): HasManyThrough
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

    /** @return HasMany<RecentlyViewed> */
    public function recentlyViewed(): HasMany
    {
        return $this->hasMany(RecentlyViewed::class, 'user_id');
    }
}
