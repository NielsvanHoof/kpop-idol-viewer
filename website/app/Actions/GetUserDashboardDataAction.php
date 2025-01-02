<?php

namespace App\Actions;

use App\Contracts\Action;
use App\Models\Article;
use App\Models\Group;
use App\Models\Idol;
use App\Models\User;
use Illuminate\Support\Collection;

/**
 * @implements Action<User, array{
 *   interactions: array{
 *     liked: Collection<int, array{
 *       id: int,
 *       type: string,
 *       name: string,
 *       model: Idol|Group,
 *       cover_photo: array{url: string, type: string}|string,
 *       slug: string,
 *       likes_count: int,
 *       followers_count: int
 *     }>,
 *     followed: Collection<int, array{
 *       id: int,
 *       type: string,
 *       name: string,
 *       model: Idol|Group,
 *       cover_photo: array{url: string, type: string}|string,
 *       slug: string,
 *       likes_count: int,
 *       followers_count: int
 *     }>,
 *     merged: Collection<int, array{
 *       id: int,
 *       type: string,
 *       name: string,
 *       model: Idol|Group,
 *       cover_photo: array{url: string, type: string}|string,
 *       slug: string,
 *       likes_count: int,
 *       followers_count: int
 *     }>
 *   },
 *   recentlyViewed: Collection<int, array<string, mixed>>,
 *   stats: array<string, mixed>,
 *   timeline: Collection<int, Article>
 * }>
 */
class GetUserDashboardDataAction implements Action
{
    public function __construct(
        private readonly GetUserInteractionsAction $interactionAction,
        private readonly GetUserHistoryAction $historyAction,
        private readonly GetUserStatsAction $statsAction,
        private readonly GetTimelineEventsAction $timelineAction,
    ) {}

    public function execute(mixed $args): array
    {
        $user = $args;

        return [
            'interactions' => $this->interactionAction->execute($user),
            'recentlyViewed' => $this->historyAction->execute(['user' => $user]),
            'stats' => $this->statsAction->execute($user),
            'timeline' => $this->timelineAction->execute(null),
        ];
    }
}
