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
            'gender' => $this->gender,
            'active' => $this->active,
            'agency' => $this->agency,

            'social_links' => $this->social_links,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'cover_photo' => $this->cover_photo,
            'background_image' => $this->background_image,
            'gallery' => $this->gallery,

            'cover_photos_count' => $this->getMedia('cover_photos')->count(),
            'gallery_count' => $this->getMedia('gallery')->count(),
            'events_count' => $this->whenCounted('events'),
            'followers_count' => $this->whenCounted('followers'),
            'likes_count' => $this->whenCounted('likes'),
            'awards_count' => $this->whenCounted('awards'),
            'merchandises_count' => $this->whenCounted('merchandises'),
            'views_count' => $this->whenCounted('views'),

            'group' => new GroupResource($this->whenLoaded('group')),
            'merchandises' => MerchandiseResource::collection($this->whenLoaded('merchandises')),
            'events' => EventResource::collection($this->whenLoaded('events')),
            'followers' => $this->whenLoaded('followers'),
            'likes' => $this->whenLoaded('likes'),
            'awards' => $this->whenLoaded('awards'),
            'genre' => new GenreResource($this->whenLoaded('genre')),
        ];
    }
}
