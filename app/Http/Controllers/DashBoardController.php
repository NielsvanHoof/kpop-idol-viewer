<?php

namespace App\Http\Controllers;

use App\Data\DashboardData;
use App\Http\Resources\IdolResource;
use App\Services\UserActivityService;
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

        /** @var DashboardData $dashboardData */
        $dashboardData = Cache::remember($cacheKey, 300, function () use ($user) {
            $interactions = $this->userActivityService->getInteractionItems($user);
            $recentlyViewed = $this->userActivityService->getRecentlyViewedItems($user);

            $activityScore = $this->userActivityService->calculateActivityScore($interactions, $recentlyViewed);
            $timelineEvents = $this->userActivityService->getTimeLineEvents();

            $stats = [
                'totalLikes' => $interactions['liked']->count(),
                'totalFollowing' => $interactions['followed']->count(),
                'joinDate' => $user->created_at,
                'activityScore' => $activityScore,
                'lastActive' => now(),
                'totalViews' => $recentlyViewed->count(),
            ];

            return new DashboardData(
                $interactions['liked'],
                $interactions['followed'],
                $recentlyViewed,
                $stats,
                $timelineEvents,
            );
        });

        return Inertia::render('Dashboard', [
            'liked' => IdolResource::collection($dashboardData->getMergedLikesAndFollows()),
            'recentlyViewed' => $dashboardData->recentlyViewed,
            'stats' => $dashboardData->stats,
            'timelineEvents' => $dashboardData->timelineEvents,
        ]);
    }
}
