<?php

namespace App\Actions;

use App\Contracts\Action;
use App\Models\User;

/**
 * @implements Action<User, array<string, mixed>>
 */
class GetUserStatsAction implements Action
{
    public function execute(mixed $args): array
    {
        $user = $args;

        return [
            'totalLikes' => $user->likedIdols()->count() + $user->likedGroups()->count(),
            'totalFollowing' => $user->followedIdols()->count() + $user->followedGroups()->count(),
            'joinDate' => $user->created_at->format('Y-m-d'),
            'activityScore' => $this->calculateActivityScore($user),
        ];
    }

    private function calculateActivityScore(User $user): int
    {
        $baseScore = 0;

        // Interactions
        $baseScore += ($user->likedIdols()->count() + $user->likedGroups()->count()) * 2;
        $baseScore += ($user->followedIdols()->count() + $user->followedGroups()->count()) * 3;

        // Recent activity
        $baseScore += $user->recentlyViewed()->count();

        return min($baseScore, 100); // Cap at 100
    }
}
