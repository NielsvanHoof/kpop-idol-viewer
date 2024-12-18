<?php

namespace App\Http\Controllers;

use App\Data\DashboardData;
use App\Http\Resources\IdolResource;
use App\Services\UserActivityService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class DashBoardController extends Controller
{
    public function __construct(
        private readonly UserActivityService $userActivityService
    ) {}

    public function __invoke(): Response
    {
        $user = Auth::user();
        $cacheKey = "dashboard_data_{$user->id}";

        // Cache dashboard data for 5 minutes
        $dashboardData = Cache::remember($cacheKey, 300, function () use ($user) {
            $interactions = $this->userActivityService->getInteractionItems($user);
            $recentlyViewed = $this->userActivityService->getRecentlyViewedItems($user);

            // Calculate activity score based on user interactions
            $activityScore = $this->calculateActivityScore($user, $interactions, $recentlyViewed);

            $stats = [
                'totalLikes' => $interactions['liked']->count(),
                'totalFollowing' => $interactions['followed']->count(),
                'joinDate' => $user->created_at,
                'activityScore' => $activityScore,
                'lastActive' => $user->last_active_at ?? now(),
                'totalViews' => $recentlyViewed->count(),
                'topGenres' => $this->getTopGenres($interactions['liked']),
            ];

            return new DashboardData(
                $interactions['liked'],
                $interactions['followed'],
                $recentlyViewed,
                $stats
            );
        });

        return Inertia::render('Dashboard', [
            'liked' => IdolResource::collection($dashboardData->getMergedLikesAndFollows()),
            'recentlyViewed' => $dashboardData->recentlyViewed,
            'stats' => $dashboardData->stats,
        ]);
    }

    private function calculateActivityScore($user, $interactions, $recentlyViewed): int
    {
        $baseScore = 0;

        $baseScore += $interactions['liked']->count() * 2;
        $baseScore += $interactions['followed']->count() * 3;
        $baseScore += $recentlyViewed->count();

        return min($baseScore, 100); // Cap at 100
    }

    private function getTopGenres(Collection $likedIdols): array
    {
        return $likedIdols
            ->pluck('genre.type')
            ->flatten()
            ->countBy()
            ->sortDesc()
            ->take(3)
            ->keys()
            ->toArray();
    }
}
