<?php

namespace App\Listeners;

use App\Events\InvalidateDashBoardCacheEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Cache;

class InvalidateDashBoardCacheListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(InvalidateDashBoardCacheEvent $event): void
    {
        $user = $event->user;

        Cache::forget("dashboard_data_{$user->id}");
    }
}
