<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'profile_photo' => $this->profile_photo,
            'likes_count' => $this->whenCounted('likes'),
            'notifications_count' => $this->whenCounted('notifications'),
            'recently_viewed_count' => $this->whenCounted('recentlyViewed'),

            'likedIdols' => IdolResource::collection($this->whenLoaded('likes')),
            'followers' => FollowerResource::collection($this->whenLoaded('followers')),
        ];
    }
}
