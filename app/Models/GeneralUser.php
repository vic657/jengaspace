<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class GeneralUser extends Authenticatable
{
    use HasApiTokens, HasFactory; // ✅ Add HasApiTokens here

    protected $fillable = [
        'name', 'email', 'phone', 'id_number', 'password',
    ];

    protected $hidden = [
        'password',
    ];
}
