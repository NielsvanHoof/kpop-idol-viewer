<?php

namespace App\Http\Controllers;

use App\Events\TriggerRecentlyViewedEvent;
use App\Http\Resources\GroupResource;
use App\Models\Group;
use App\Services\Spotify\SpotifyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function __construct(private SpotifyService $spotifyService) {}

    public function index(Request $request)
    {
        $groups = Group::query()
            ->withCount(['idols', 'events'])
            ->paginate(
                perPage: $request->input('perPage', 10),
            );

        return Inertia::render('Group/GroupOverview', [
            'groups' => GroupResource::collection($groups),
        ]);
    }

    public function show(Group $group)
    {
        $group->load([
            'idols.followers',
            'events',
            'likes',
            'followers',
            'awards',
        ]);
        $group->loadCount(['idols', 'events', 'likes', 'followers', 'awards']);

        if (isset($group->spotify_id)) {
            $songs = Cache::remember("group-{$group->id}-songs", now()->addHours(12), function () use ($group) {
                return $this->spotifyService->getArtistAlbums($group->spotify_id)->json();
            });

            $artistInformation = Cache::remember("group-{$group->id}-artist-information", now()->addHours(12), function () use ($group) {
                return $this->spotifyService->getArtistInformation($group->spotify_id)->json();
            });
        }

        TriggerRecentlyViewedEvent::dispatchIf(
            ! empty(Auth::user()),
            Auth::user(),
            'group',
            $group->id
        );

        return Inertia::render('Group/GroupProfile', [
            'group' => GroupResource::make($group),
            'songs' => $songs ?? null,
            'artistInformation' => $artistInformation ?? null,
        ]);
    }
}
