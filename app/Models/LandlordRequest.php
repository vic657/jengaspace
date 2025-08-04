<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandlordRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'id_number',
        'location',
        'password',
        'status',
        'registration_fee',
    ];
}
