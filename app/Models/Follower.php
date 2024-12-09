<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 *
 * @property int $id
 * @property int $followers
 * @property string $followable_type
 * @property int $followable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereFollowableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereFollowableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereFollowers($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower withoutTrashed()
 * @mixin \Eloquent
 */
class Follower extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'followers',
    ];
}
