<?php

namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class Article extends Model {
        protected $fillable = [
        'title',
        'description',
        'date',
        'category',
        ];

        protected function casts(): array
        {
        return [
        'date' => 'date',
        ];
        }
    }
