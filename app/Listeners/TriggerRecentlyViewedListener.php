<?php

namespace App\Listeners;
use App\Events\TriggerRecentlyViewedEvent;

class TriggerRecentlyViewedListener{
    public function __construct()
    {
    }

    public function handle(TriggerRecentlyViewedEvent $event): void
    {
        //
    }
}
