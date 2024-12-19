<?php

namespace App\Http\Controllers;

use App\Data\DashboardData;
use App\Http\Resources\IdolResource;
use App\Models\User;
use App\Services\UserActivityService;
use Illuminate\Support\Collection;
use App\Models\Idol;
use App\Models\RecentlyViewed;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class DashBoardController extends Controller
{
    public function __construct(
        private readonly UserActivityService $userActivityService
    ) {
    }

    public function __invoke(): Response
    {
        $user = Auth::user();
        $cacheKey = "dashboard_data_{$user->id}";

        /** @var DashboardData $dashboardData */
        $dashboardData = Cache::remember($cacheKey, 300, function () use ($user) {
            $interactions = $this->userActivityService->getInteractionItems($user);
            $recentlyViewed = $this->userActivityService->getRecentlyViewedItems($user);

            $activityScore = $this->calculateActivityScore($user, $interactions, $recentlyViewed);

            $stats = [
                'totalLikes' => $interactions['liked']->count(),
                'totalFollowing' => $interactions['followed']->count(),
                'joinDate' => $user->created_at,
                'activityScore' => $activityScore,
                'lastActive' => $user->last_active_at ?? now(),
                'totalViews' => $recentlyViewed->count(),
            ];

            return new DashboardData(
                $interactions['liked'],
                $interactions['followed'],
                $recentlyViewed,
                $stats,
                $this->userActivityService->getTimeLineEvents($user),
            );
        });

        return Inertia::render('Dashboard', [
            'liked' => IdolResource::collection($dashboardData->getMergedLikesAndFollows()),
            'recentlyViewed' => $dashboardData->recentlyViewed,
            'stats' => $dashboardData->stats,
            'timelineEvents' => $dashboardData->timelineEvents,
        ]);
    }

    /**
     * @param array{
     *   liked: Collection<int, Idol>,
     *   followed: Collection<int, Idol>,
     *   merged: Collection<int, Idol>
     * } $interactions
     * @param Collection<int, RecentlyViewed> $recentlyViewed
     */
    private function calculateActivityScore(User $user, array $interactions, Collection $recentlyViewed): int
    {
        $baseScore = 0;

        $baseScore += $interactions['liked']->count();
        $baseScore += $interactions['followed']->count() * 3;
        $baseScore += $recentlyViewed->count();

        return min($baseScore, 100); // Cap at 100
    }
}
