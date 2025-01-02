<?php

namespace App\Actions;

use App\Contracts\Action;
use App\Models\Article;
use Illuminate\Support\Collection;

/**
 * @implements Action<int|null, Collection<int, Article>>
 */
class GetTimelineEventsAction implements Action
{
    public function execute(mixed $args): Collection
    {
        $limit = $args ?? 5;

        return Article::query()
            ->latest()
            ->limit($limit)
            ->get();
    }
}
