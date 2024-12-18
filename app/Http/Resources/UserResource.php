<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

/** @mixin User */class UserResource extends JsonResource{
    public function toArray(Request $request): array
    {
        return [
'id' => $this->id,
'name' => $this->name,
'email' => $this->email,
'email_verified_at' => $this->email_verified_at,
'password' => $this->password,
'remember_token' => $this->remember_token,
'created_at' => $this->created_at,
'updated_at' => $this->updated_at,
'profile_photo' => $this->profile_photo,
'liked_idols_count' => $this->liked_idols_count,
'likes_count' => $this->likes_count,
'notifications_count' => $this->notifications_count,
'read_notifications_count' => $this->read_notifications_count,
'recently_viewed_count' => $this->recently_viewed_count,
'unread_notifications_count' => $this->unread_notifications_count,
'favorites_count' => $this->favorites_count,
'recently_vieweds_count' => $this->recently_vieweds_count,

'likedIdols' => IdolResource::collection($this->whenLoaded('likedIdols')),//
        ];
    }
}
