<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class DashboardData extends Data
{
    public function __construct(
        public Collection $liked,
        public Collection $followed,
        public Collection $recentlyViewed,
        public array $stats,
        public Collection $timelineEvents
    ) {}

    public function getMergedLikesAndFollows(): Collection
    {
        return $this->liked->merge($this->followed)->unique('id')->take(4);
    }
}
