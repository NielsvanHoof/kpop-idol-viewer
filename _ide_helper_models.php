<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property \Illuminate\Support\Carbon $date
 * @property \App\Enums\ArticleTypes $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ArticleFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Article whereUpdatedAt($value)
 */
	class Article extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property \Illuminate\Support\Carbon $from
 * @property \App\Enums\EventTypes|null $type
 * @property string $awardable_type
 * @property int $awardable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $awardable
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereAwardableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereAwardableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Award whereUpdatedAt($value)
 */
	class Award extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property array|null $location
 * @property \Illuminate\Support\Carbon $date
 * @property string|null $venue
 * @property string $eventable_type
 * @property int $eventable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \App\Enums\EventTypes|null $type
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $eventable
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection<int, \Spatie\MediaLibrary\MediaCollections\Models\Media> $media
 * @property-read int|null $media_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event concert()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event fanMeeting()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event other()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event signing()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereEventableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereEventableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereVenue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event withoutTrashed()
 */
	class Event extends \Eloquent implements \Spatie\MediaLibrary\HasMedia {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $followable_type
 * @property int $followable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $followable
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\FollowerFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereFollowableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereFollowableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Follower withoutTrashed()
 */
	class Follower extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $type
 * @property string $genreable_type
 * @property int $genreable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $genreable
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereGenreableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereGenreableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereUpdatedAt($value)
 */
	class Genre extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $bio
 * @property bool $active
 * @property \Illuminate\Support\Carbon $debute_date
 * @property array|null $social_links
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property string $slug
 * @property string|null $spotify_id
 * @property string|null $background_video
 * @property \App\Enums\GroupTypes|null $type
 * @property string|null $agency
 * @property string|null $fandom_name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Award> $awards
 * @property-read int|null $awards_count
 * @property-read mixed $cover_photo
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Event> $events
 * @property-read int|null $events_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Follower> $followers
 * @property-read int|null $followers_count
 * @property-read mixed $gallery
 * @property-read \App\Models\Genre|null $genre
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Idol> $idols
 * @property-read int|null $idols_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Like> $likes
 * @property-read int|null $likes_count
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection<int, \Spatie\MediaLibrary\MediaCollections\Models\Media> $media
 * @property-read int|null $media_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Merchandise> $merchandises
 * @property-read int|null $merchandises_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RecentlyViewed> $views
 * @property-read int|null $views_count
 * @method static \Database\Factories\GroupFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereAgency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereBackgroundVideo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereDebuteDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereFandomName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereSocialLinks($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereSpotifyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Group withoutTrashed()
 */
	class Group extends \Eloquent implements \Spatie\MediaLibrary\HasMedia {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $stage_name
 * @property string|null $position
 * @property string|null $bio
 * @property \Illuminate\Support\Carbon $debute_date
 * @property bool $active
 * @property array|null $social_links
 * @property int|null $group_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property string $slug
 * @property string|null $spotify_id
 * @property \Illuminate\Support\Carbon|null $birth_date
 * @property string $gender
 * @property string|null $agency
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Award> $awards
 * @property-read int|null $awards_count
 * @property-read mixed $background_image
 * @property-read mixed $cover_photo
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Event> $events
 * @property-read int|null $events_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Follower> $followers
 * @property-read int|null $followers_count
 * @property-read mixed $gallery
 * @property-read \App\Models\Genre|null $genre
 * @property-read \App\Models\Group|null $group
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Like> $likes
 * @property-read int|null $likes_count
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection<int, \Spatie\MediaLibrary\MediaCollections\Models\Media> $media
 * @property-read int|null $media_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Merchandise> $merchandises
 * @property-read int|null $merchandises_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RecentlyViewed> $views
 * @property-read int|null $views_count
 * @method static \Database\Factories\IdolFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereAgency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereDebuteDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereSocialLinks($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereSpotifyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereStageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Idol withoutTrashed()
 */
	class Idol extends \Eloquent implements \Spatie\MediaLibrary\HasMedia {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $likeable_type
 * @property int $likeable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $likeable
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\LikeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereLikeableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereLikeableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereUserId($value)
 */
	class Like extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property float $price
 * @property bool $available
 * @property \Illuminate\Support\Carbon $release_date
 * @property string $merchandiseable_type
 * @property int $merchandiseable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $merchandiseable
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereMerchandiseableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereMerchandiseableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Merchandise withoutTrashed()
 */
	class Merchandise extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $viewable_type
 * @property int $viewable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $viewable
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed whereViewableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecentlyViewed whereViewableType($value)
 */
	class RecentlyViewed extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Idol> $follows
 * @property-read int|null $follows_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Idol> $likes
 * @property-read int|null $likes_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read mixed $profile_photo
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RecentlyViewed> $recentlyViewed
 * @property-read int|null $recently_viewed_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

