<?php

namespace App\Services;

use App\Models\Group;
use App\Models\Idol;
use App\Models\RecentlyViewed;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Collection;

class UserActivityService
{
    /**
     * @return array{
     *   liked: Collection<int, Idol>,
     *   followed: Collection<int, Idol>,
     *   merged: Collection<int, Idol>
     * }
     */
    public function getInteractionItems(User $user): array
    {
        $liked = $user->likes()
            ->with([
                'group' => function (BelongsTo $query) {
                    $query->withCount(['followers', 'likes'])
                        ->with('media');
                },
                'likes',
                'followers',
            ])
            ->get();

        $followed = $user->follows()
            ->with([
                'group' => function (BelongsTo $query) {
                    $query->withCount(['followers', 'likes'])
                        ->with('media');
                },
                'likes',
                'followers',
            ])
            ->get();

        return [
            'liked' => $liked,
            'followed' => $followed,
            'merged' => $liked->merge($followed)->unique('id'),
        ];
    }

    /** @return Collection<int, RecentlyViewed> */
    public function getRecentlyViewedItems(User $user): Collection
    {
        return $user->recentlyViewed()
            ->with([
                'viewable' => function (MorphTo $query) {
                    $query->morphWith([
                        Idol::class => [
                            'group' => function ($query) {
                                $query->withCount(['followers', 'likes']);
                            },
                            'media',
                        ],
                        Group::class => [
                            'media',
                        ],
                    ]);
                },
            ])
            ->latest()
            ->get()
            ->transform(fn (RecentlyViewed $item) => $this->transformRecentlyViewedItem($item));
    }

    /** @return array<string, mixed> */
    private function transformRecentlyViewedItem(RecentlyViewed $item): array
    {
        return [
            'id' => $item->id,
            'type' => class_basename($item->viewable_type),
            'name' => $item->viewable->name,
            'cover_photo' => $item->viewable->cover_photo ?? '/default-cover.jpg',
            'group' => $item->viewable->group->name ?? 'N/A',
            'slug' => $item->viewable->slug,
        ];
    }

    /** @return array<string, mixed> */
    public function getUserStats(User $user, int $totalLikes, int $totalFollowing): array
    {
        return [
            'totalLikes' => $totalLikes,
            'totalFollowing' => $totalFollowing,
            'joinDate' => $user->created_at->format('Y-m-d'),
        ];
    }

    public function getTimeLineEvents(User $user): Collection
    {
        return collect([]);
    }
}
