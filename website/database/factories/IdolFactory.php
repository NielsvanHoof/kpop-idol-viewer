<?php

namespace Database\Factories;

use App\Enums\GenderTypes;
use App\Models\Idol;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class IdolFactory extends Factory
{
    protected $model = Idol::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'stage_name' => $this->faker->name(),
            'position' => $this->faker->word(),
            'bio' => $this->faker->word(),
            'debute_date' => Carbon::now(),
            'active' => $this->faker->boolean(),
            'social_links' => $this->faker->words(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'slug' => $this->faker->slug(),
            'spotify_id' => $this->faker->word(),
            'birth_date' => Carbon::now(),
            'gender' => $this->faker->randomElement(GenderTypes::cases()),
            'agency' => $this->faker->word(),
        ];
    }
}
