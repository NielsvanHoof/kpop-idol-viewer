<?php

namespace App\Http\Resources;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Event */ class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'location' => $this->location,
            'date' => $this->date,
            'venue' => $this->venue,
            'idol_id' => $this->idol_id,
            'group_id' => $this->group_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'media_count' => $this->media_count,
            'registerMediaConversionsUsingModelInstance' => $this->registerMediaConversionsUsingModelInstance,
        ];
    }
}
