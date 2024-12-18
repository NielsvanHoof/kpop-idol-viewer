<?php

namespace Database\Factories;

use App\Models\Idol;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Follower>
 */
class FollowerFactory extends Factory
{
    protected $model = Follower::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'followable_id' => Idol::factory(),
            'followable_type' => function (array $attributes) {
                return Idol::find($attributes['followable_id'])->type;
            },
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
