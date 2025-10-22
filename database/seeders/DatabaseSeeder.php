<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create sample users
        \App\Models\User::factory(10)->create();

        // Create sample surveys
        $categories = \App\Models\SurveyCategory::all();
        
        foreach ($categories as $category) {
            \App\Models\Survey::factory(3)->create([
                'category_id' => $category->id,
                'status' => 'active',
                'is_featured' => rand(0, 1) == 1
            ]);
        }
    }
}
