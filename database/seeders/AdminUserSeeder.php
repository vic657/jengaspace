<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@jengaspace.ke'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('password123'),
                'is_admin' => true,
            ]
        );
    }
}
