<?php

namespace App\Http\Resources;

use App\Models\Article;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

/** @mixin Article */class ArticleResource extends JsonResource{
    public function toArray(Request $request): array
    {
        return [
'id' => $this->id,
'title' => $this->title,
'description' => $this->description,
'date' => $this->date,
'type' => $this->type,
'created_at' => $this->created_at,
'updated_at' => $this->updated_at,//
        ];
    }
}
