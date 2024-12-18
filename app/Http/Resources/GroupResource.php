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
            'background_video' => $this->background_video,
            'gallery' => $this->gallery,
            'type' => $this->type,
            'agency' => $this->agency,
            'fandom_name' => $this->fandom_name,

            'cover_photos_count' => $this->getMedia('cover_photos')->count(),
            'gallery_count' => $this->getMedia('gallery')->count(),

            'events_count' => $this->whenCounted('events'),
            'idols_count' => $this->whenCounted('idols'),
            'followers_count' => $this->whenCounted('followers'),
            'awards_count' => $this->whenCounted('awards'),
            'likes_count' => $this->whenCounted('likes'),
            'merchandises_count' => $this->whenCounted('merchandises'),
            'views_count' => $this->whenCounted('views'),

            'idols' => IdolResource::collection($this->whenLoaded('idols')),
            'merchandises' => MerchandiseResource::collection($this->whenLoaded('merchandises')),
            'events' => EventResource::collection($this->whenLoaded('events')),
            'followers' => $this->whenLoaded('followers'),
            'likes' => $this->whenLoaded('likes'),
            'awards' => $this->whenLoaded('awards'),
            'genre' => new GenreResource($this->whenLoaded('genre')),
        ];
    }
}
