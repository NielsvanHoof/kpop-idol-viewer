<?php

namespace App\Data;

use App\Models\Article;
use App\Models\Group;
use App\Models\Idol;
use App\Models\RecentlyViewed;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class DashboardData extends Data
{
    public function __construct(
        /** @var Collection<int, Idol|Group> */
        public Collection $liked,
        /** @var Collection<int, Idol|Group> */
        public Collection $followed,
        /** @var Collection<int, RecentlyViewed> */
        public Collection $recentlyViewed,
        /** @var array<string, mixed> */
        public array $stats,
        /** @var Collection<int, Article> */
        public Collection $timelineEvents
    ) {}
}
