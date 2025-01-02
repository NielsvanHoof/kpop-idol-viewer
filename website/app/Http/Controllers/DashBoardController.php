<?php

namespace App\Http\Controllers;

use App\Actions\GetUserDashboardDataAction;
use App\Data\DashboardData;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class DashBoardController extends Controller
{
    public function __invoke(GetUserDashboardDataAction $action): Response
    {
        $user = Auth::user();
        $cacheKey = "dashboard_data_{$user->id}";

        /** @var DashboardData $dashboardData */
        $dashboardData = Cache::remember($cacheKey, 300, function () use ($user, $action) {
            $data = $action->execute($user);

            return new DashboardData(
                $data['interactions']['liked'],
                $data['interactions']['followed'],
                $data['recentlyViewed'],
                $data['stats'],
                $data['timeline'],
            );
        });

        return Inertia::render('Dashboard', [
            'liked' => $dashboardData->liked,
            'recentlyViewed' => $dashboardData->recentlyViewed,
            'stats' => $dashboardData->stats,
            'timeLineEvents' => $dashboardData->timelineEvents,
        ]);
    }
}
