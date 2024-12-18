<?php

namespace App\Http\Controllers;

use App\Services\UserActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecentlyViewedController extends Controller
{
    public function __construct(
        private readonly UserActivityService $userActivityService
    ) {
        //
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $recentlyViewed = $this->userActivityService->getRecentlyViewedItems($user);

        // Calculate metadata
        $totalViews = $recentlyViewed->count();
        $uniqueItems = $recentlyViewed->unique('viewable_id')->count();
        $lastViewed = $recentlyViewed->first()['created_at'] ?? now();

        return Inertia::render('Profile/RecentlyViewed', [
            'recentlyViewed' => $recentlyViewed,
            'meta' => [
                'totalViews' => $totalViews,
                'uniqueItems' => $uniqueItems,
                'lastViewed' => $lastViewed->toIso8601String(),
            ],
        ]);
    }
}
