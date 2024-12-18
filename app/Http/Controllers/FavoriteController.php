<?php

namespace App\Http\Controllers;

use App\Http\Resources\IdolResource;
use App\Services\UserActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
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
        $interactions = $this->userActivityService->getInteractionItems($user);

        // Get total counts for metadata
        $totalLikes = $interactions['liked']->count();
        $totalFollowing = $interactions['followed']->count();

        return Inertia::render('Profile/Favorites', [
            'favorites' => IdolResource::collection($interactions['merged']),
            'meta' => [
                'totalLikes' => $totalLikes,
                'totalFollowing' => $totalFollowing,
                'lastUpdated' => now()->toIso8601String(),
            ],
        ]);
    }
}
