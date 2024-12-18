<?php

namespace App\Http\Controllers;

use App\Events\TriggerRecentlyViewedEvent;
use App\Http\Resources\IdolResource;
use App\Models\Idol;
use App\Services\Spotify\SpotifyService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class IdolController extends Controller
{
    public function __construct(
        private readonly SpotifyService $spotifyService
    ) {
        //
    }

    public function index(Request $request)
    {
        $idols = QueryBuilder::for(Idol::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::exact('gender'),
                AllowedFilter::callback('has_group', function (Builder $query, mixed $value) {
                    if ($value) {
                        $query->whereHas('group');
                    } else {
                        $query->doesntHave('group');
                    }
                }),
            ])
            ->allowedSorts([
                'name',
                'debute_date',
                'followers_count',
            ])
            ->with(['group', 'followers', 'likes'])
            ->withCount(['followers', 'likes'])
            ->cursorPaginate(
                perPage: $request->input('per_page', 12),
            );

        return Inertia::render('Idol/Idol.overview', [
            'idols' => fn () => Inertia::merge(IdolResource::collection($idols)),
        ]);
    }

    public function show(Idol $idol)
    {
        $idol->load(['merchandises', 'group', 'events', 'followers', 'likes', 'media', 'awards']);
        $idol->loadCount(['events', 'followers', 'likes', 'awards']);

        if (isset($idol->spotify_id)) {
            $songs = Cache::remember("idol-{$idol->id}-songs", now()->addHours(12), function () use ($idol) {
                return $this->spotifyService->getArtistAlbums($idol->spotify_id)->json();
            });

            $artistInformation = Cache::remember("idol-{$idol->id}-artist-information", now()->addHours(12), function () use ($idol) {
                return $this->spotifyService->getArtistInformation($idol->spotify_id)->json();
            });
        }

        TriggerRecentlyViewedEvent::dispatchIf(
            ! empty(Auth::user()),
            Auth::user(),
            'idol',
            $idol->id
        );

        return Inertia::render('Idol/Idol.profile', [
            'idol' => IdolResource::make($idol),
            'songs' => $songs ?? null,
            'artistInformation' => $artistInformation ?? null,
        ]);
    }
}
