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
            'type' => $this->type,
            'venue' => $this->venue,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'group' => new GroupResource($this->whenLoaded('group')),
            'idols' => IdolResource::collection($this->whenLoaded('idols')),
        ];
    }
}
