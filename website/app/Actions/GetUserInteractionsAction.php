<?php

namespace App\Actions;

use App\Contracts\Action;
use App\Models\Group;
use App\Models\Idol;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @implements Action<User, array{
 *   liked: Collection<int, array{
 *     id: int,
 *     type: string,
 *     name: string,
 *     model: Idol|Group,
 *     cover_photo: array{url: string, type: string}|string,
 *     slug: string,
 *     likes_count: int,
 *     followers_count: int
 *   }>,
 *   followed: Collection<int, array{
 *     id: int,
 *     type: string,
 *     name: string,
 *     model: Idol|Group,
 *     cover_photo: array{url: string, type: string}|string,
 *     slug: string,
 *     likes_count: int,
 *     followers_count: int
 *   }>,
 *   merged: Collection<int, array{
 *     id: int,
 *     type: string,
 *     name: string,
 *     model: Idol|Group,
 *     cover_photo: array{url: string, type: string}|string,
 *     slug: string,
 *     likes_count: int,
 *     followers_count: int
 *   }>
 * }>
 */
class GetUserInteractionsAction implements Action
{
    public function execute(mixed $args): array
    {
        $user = $args;
        $likedIdols = $this->getLikedIdols($user)->map(fn (Idol $idol) => $this->transformToResource($idol, 'idol'));
        $likedGroups = $this->getLikedGroups($user)->map(callback: fn (Group $group) => $this->transformToResource($group, 'group'));
        $followedIdols = $this->getFollowedIdols($user)->map(fn (Idol $idol) => $this->transformToResource($idol, 'idol'));
        $followedGroups = $this->getFollowedGroups($user)->map(fn (Group $group) => $this->transformToResource($group, 'group'));

        return [
            'liked' => $likedIdols->merge($likedGroups),
            'followed' => $followedIdols->merge($followedGroups),
            'merged' => $likedIdols->merge($followedIdols)->unique('id'),
        ];
    }

    /**
     * @param  'idol'|'group'  $type
     * @return array{
     *   id: int,
     *   type: string,
     *   name: string,
     *   model: Idol|Group,
     *   cover_photo: array{url: string, type: string}|string,
     *   slug: string,
     *   likes_count: int,
     *   followers_count: int
     * }
     */
    private function transformToResource(Idol|Group $model, string $type): array
    {
        return [
            'id' => $model->id,
            'type' => $type,
            'name' => $model->name,
            'model' => $model,
            'cover_photo' => $model->cover_photo,
            'slug' => $model->slug,
            'likes_count' => $model->likes_count ?? $model->likes()->count(),
            'followers_count' => $model->followers_count ?? $model->followers()->count(),
        ];
    }

    /** @return Collection<int, Idol> */
    private function getLikedIdols(User $user): Collection
    {
        return $user->likedIdols()
            ->with([
                'group' => function (BelongsTo $query) {
                    $query->withCount(['followers', 'likes']);
                },
                'likes',
                'followers',
                'media',
            ])
            ->withCount(['likes', 'followers'])
            ->get();
    }

    /** @return Collection<int, Group> */
    private function getLikedGroups(User $user): Collection
    {
        return $user->likedGroups()
            ->with([
                'idols' => function (HasMany $query) {
                    $query->withCount(['likes', 'followers']);
                },
                'likes',
                'followers',
                'media',
            ])
            ->withCount(['likes', 'followers'])
            ->get();
    }

    /** @return Collection<int, Idol> */
    private function getFollowedIdols(User $user): Collection
    {
        return $user->followedIdols()
            ->with([
                'group' => function (BelongsTo $query) {
                    $query->withCount(['followers', 'likes']);
                },
                'likes',
                'followers',
                'media',
            ])
            ->withCount(['likes', 'followers'])
            ->get();
    }

    /** @return Collection<int, Group> */
    private function getFollowedGroups(User $user): Collection
    {
        return $user->followedGroups()
            ->with([
                'idols' => function (HasMany $query) {
                    $query->withCount(['likes', 'followers']);
                },
                'likes',
                'followers',
                'media',
            ])
            ->withCount(['likes', 'followers'])
            ->get();
    }
}
