<?php

namespace App\Http\Resources;

use App\Models\Idol;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Idol */
class IdolResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'bio' => $this->bio,
            'slug' => $this->slug,
            'debute_date' => $this->debute_date,
            'birth_date' => $this->birth_date,
            'position' => $this->position,
            'stage_name' => $this->stage_name,
            'spotify_id' => $this->spotify_id,
            'active' => $this->active,
            'followers' => $this->followers,
            'social_links' => $this->social_links,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'cover_photo' => $this->cover_photo,
            'gallery' => $this->gallery,

            'events_count' => $this->whenCounted('events'),

            'group' => new GroupResource($this->whenLoaded('group')),
            'merchandises' => MerchandiseResource::collection($this->whenLoaded('merchandises')),
            'events' => EventResource::collection($this->whenLoaded('events')),
        ];
    }
}
