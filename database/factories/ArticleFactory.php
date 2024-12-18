<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ArticleFactory extends Factory{
    protected $model = Article::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),//
'slug' => $this->faker->slug(),
'description' => $this->faker->text(),
'date' => Carbon::now(),
'type' => $this->faker->word(),
'created_at' => Carbon::now(),
'updated_at' => Carbon::now(),
        ];
    }
}
