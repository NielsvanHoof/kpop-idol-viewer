<?php

namespace Database\Factories;

use App\Enums\GroupTypes;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class GroupFactory extends Factory
{
    protected $model = Group::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'bio' => $this->faker->word(),
            'active' => $this->faker->boolean(),
            'debute_date' => Carbon::now(),
            'social_links' => $this->faker->words(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'slug' => $this->faker->slug(),
            'spotify_id' => $this->faker->word(),
            'type' => $this->faker->randomElement(GroupTypes::cases()),
            'agency' => $this->faker->word(),
            'fandom_name' => $this->faker->name(),
        ];
    }
}
