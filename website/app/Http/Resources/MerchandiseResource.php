<?php

namespace App\Http\Resources;

use App\Models\Merchandise;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Merchandise */
class MerchandiseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'available' => $this->available,
            'release_date' => $this->release_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'group' => new GroupResource($this->whenLoaded('group')),
            'idol' => new IdolResource($this->whenLoaded('idol')),
        ];
    }
}
