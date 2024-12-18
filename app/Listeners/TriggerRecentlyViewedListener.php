<?php

namespace App\Listeners;

use App\Events\TriggerRecentlyViewedEvent;
use App\Models\Group;
use App\Models\Idol;
use Illuminate\Contracts\Queue\ShouldQueue;

class TriggerRecentlyViewedListener implements ShouldQueue
{
    public function __construct() {}

    public function handle(TriggerRecentlyViewedEvent $event): void
    {
        $user = $event->user;
        $type = $event->type;
        $id = $event->id;

        switch ($type) {
            case 'idol':
                $idol = Idol::find($id);

                if ($idol->views()->where('user_id', $user->id)->exists()) {
                    return;
                }

                $idol->views()->create([
                    'user_id' => $user->id,
                ]);

                break;
            case 'group':
                $group = Group::find($id);

                if ($group->views()->where('user_id', $user->id)->exists()) {
                    return;
                }

                $group->views()->create([
                    'user_id' => $user->id,
                ]);
                break;
        }

    }
}
