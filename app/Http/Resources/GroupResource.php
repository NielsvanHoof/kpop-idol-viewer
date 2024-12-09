<?php

namespace App\Http\Resources;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Group */
class GroupResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'bio' => $this->bio,
            'active' => $this->active,
            'slug' => $this->slug,
            'spotify_id' => $this->spotify_id,
            'debute_date' => $this->debute_date,
            'social_links' => $this->social_links,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'cover_photo' => $this->cover_photo,

            'events_count' => $this->whenCounted('events'),
            'idols_count' => $this->whenCounted('idols'),

            'idols' => IdolResource::collection($this->whenLoaded('idols')),
        ];
    }
}
