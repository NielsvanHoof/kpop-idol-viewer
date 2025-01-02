<?php

namespace App\Http\Controllers;

use App\Actions\GetUserHistoryAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecentlyViewedController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(GetUserHistoryAction $action)
    {
        $user = Auth::user();
        $recentlyViewed = $action->execute(['user' => $user]);

        return Inertia::render('Profile/RecentlyViewed', [
            'recentlyViewed' => $recentlyViewed,
            'meta' => [
                'totalViews' => $recentlyViewed->count(),
                'uniqueItems' => $recentlyViewed->unique('viewable_id')->count(),
                'lastViewed' => $recentlyViewed->first()['created_at'] ?? now(),
            ],
        ]);
    }
}
