<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TriggerRecentlyViewedEvent
{
    use Dispatchable, SerializesModels;

    public function __construct(public readonly User $user, public readonly string $type, public readonly int $id) {}
}
