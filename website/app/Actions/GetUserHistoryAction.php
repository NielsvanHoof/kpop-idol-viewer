<?php

namespace App\Actions;

use App\Contracts\Action;
use App\Models\Idol;
use App\Models\RecentlyViewed;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Collection;

/**
 * @implements Action<array{user: User, limit?: int}, Collection<int, array<string, mixed>>>
 */
class GetUserHistoryAction implements Action
{
    public function execute(mixed $args): Collection
    {
        $user = $args['user'];
        $limit = $args['limit'] ?? 3;

        return $user->recentlyViewed()
            ->with([
                'viewable' => function (MorphTo $query) {
                    $query->morphWith([
                        Idol::class => [
                            'group' => function (BelongsTo $query) {
                                $query->withCount(['followers', 'likes']);
                            },
                        ],
                    ]);
                },
            ])
            ->latest()
            ->limit($limit)
            ->get()
            ->transform(fn(RecentlyViewed $item) => $this->transformRecentlyViewedItem($item));
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
}
