<?php

namespace App\Http\Controllers;

use App\Actions\GetUserInteractionsAction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(GetUserInteractionsAction $action)
    {
        $user = Auth::user();
        $interactions = $action->execute($user);

        return Inertia::render('Profile/Favorites', [
            'favorites' => $interactions['merged'],
            'meta' => [
                'totalLikes' => $interactions['liked']->count(),
                'totalFollowing' => $interactions['followed']->count(),
                'lastUpdated' => $interactions['liked']->first()['created_at'] ?? now(),
            ],
        ]);
    }
}
