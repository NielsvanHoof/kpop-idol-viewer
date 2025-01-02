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
            // Basic Information
            'id' => $this->id,
            'name' => $this->name,
            'bio' => $this->bio,
            'slug' => $this->slug,
            'type' => $this->type,
            'active' => $this->active,
            'agency' => $this->agency,
            'country' => $this->country,
            'fandom_name' => $this->fandom_name,

            // Dates
            'debute_date' => $this->debute_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // External IDs
            'spotify_id' => $this->spotify_id,

            // Media
            'cover_photo' => $this->cover_photo,
            'background_video' => $this->background_video,
            'gallery' => $this->gallery,
            'social_links' => $this->social_links,

            // Media Counts
            'cover_photos_count' => $this->getMedia('cover_photos')->count(),
            'gallery_count' => $this->getMedia('gallery')->count(),

            // Relationship Counts
            'events_count' => $this->whenCounted('events'),
            'idols_count' => $this->whenCounted('idols'),
            'followers_count' => $this->whenCounted('followers'),
            'awards_count' => $this->whenCounted('awards'),
            'likes_count' => $this->whenCounted('likes'),
            'merchandises_count' => $this->whenCounted('merchandises'),
            'views_count' => $this->whenCounted('views'),

            // Relationships
            'genre' => GenreResource::make($this->whenLoaded('genre')),
            'idols' => IdolResource::collection($this->whenLoaded('idols')),
            'events' => EventResource::collection($this->whenLoaded('events')),
            'merchandises' => MerchandiseResource::collection($this->whenLoaded('merchandises')),
            'followers' => FollowerResource::collection($this->whenLoaded('followers')),
            'likes' => LikeResource::collection($this->whenLoaded('likes')),
            'awards' => AwardResource::collection($this->whenLoaded('awards')),
        ];
    }
}
