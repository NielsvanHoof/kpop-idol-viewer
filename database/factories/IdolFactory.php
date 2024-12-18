<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\Idol;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class IdolFactory extends Factory{
    protected $model = Idol::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),//
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
'gender' => $this->faker->word(),
'agency' => $this->faker->word(),
'background_image' => $this->faker->word(),
'cover_photo' => $this->faker->word(),
'registerMediaConversionsUsingModelInstance' => $this->faker->boolean(),

'group_id' => Group::factory(),
        ];
    }
}
