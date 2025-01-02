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
            // Basic Information
            'id' => $this->id,
            'name' => $this->name,
            'stage_name' => $this->stage_name,
            'bio' => $this->bio,
            'slug' => $this->slug,
            'position' => $this->position,
            'gender' => $this->gender,
            'active' => $this->active,
            'agency' => $this->agency,
            'country' => $this->country,

            // Dates
            'birth_date' => $this->birth_date,
            'debute_date' => $this->debute_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // External IDs
            'spotify_id' => $this->spotify_id,

            // Media
            'cover_photo' => $this->cover_photo,
            'background_image' => $this->background_image,
            'gallery' => $this->gallery,
            'social_links' => $this->social_links,

            // Media Counts
            'cover_photos_count' => $this->getMedia('cover_photos')->count(),
            'gallery_count' => $this->getMedia('gallery')->count(),

            // Relationship Counts
            'events_count' => $this->whenCounted('events'),
            'followers_count' => $this->whenCounted('followers'),
            'likes_count' => $this->whenCounted('likes'),
            'awards_count' => $this->whenCounted('awards'),
            'merchandises_count' => $this->whenCounted('merchandises'),
            'views_count' => $this->whenCounted('views'),
            'comments_count' => $this->whenCounted('comments'),

            // Relationships
            'group' => GroupResource::make($this->whenLoaded('group')),
            'genre' => GenreResource::make($this->whenLoaded('genre')),
            'events' => EventResource::collection($this->whenLoaded('events')),
            'merchandises' => MerchandiseResource::collection($this->whenLoaded('merchandises')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'followers' => FollowerResource::collection($this->whenLoaded('followers')),
            'likes' => LikeResource::collection($this->whenLoaded('likes')),
            'awards' => AwardResource::collection($this->whenLoaded('awards')),
        ];
    }
}
