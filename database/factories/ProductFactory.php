<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'item_number' => fake()->unique()->bothify('ITEM-#####'),
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'condition' => fake()->randomElement(['Új', 'Használt', 'Tesztelt', 'Javitott'])
        ];
    }
}
