<?php

namespace App\Services;

use App\Models\Article;
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
                'group',
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
                        ],
                    ]);
                },
            ])
            ->latest()
            ->limit(3)
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
            'viewable' => $item->viewable,
            'cover_photo' => $item->viewable->cover_photo ?? '/default-cover.jpg',
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

    /** @return Collection<int, Article> */
    public function getTimeLineEvents(): Collection
    {
        return Article::query()->latest()->limit(5)->get();
    }

    /**
     * @param array{
     *   liked: Collection<int, Idol>,
     *   followed: Collection<int, Idol>,
     *   merged: Collection<int, Idol>
     * } $interactions
     * @param  Collection<int, RecentlyViewed>  $recentlyViewed
     */
    public function calculateActivityScore(array $interactions, Collection $recentlyViewed): int
    {
        $baseScore = 0;

        $baseScore += $interactions['liked']->count();
        $baseScore += $interactions['followed']->count() * 3;
        $baseScore += $recentlyViewed->count();

        return min($baseScore, 100); // Cap at 100
    }
}
