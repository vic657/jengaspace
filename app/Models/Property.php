<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category',
        'bedrooms',
        'location',
        'rent',
        'description',
        'livingRoom_image',
        'bedroom_image',
        'kitchen_image',
        'bathroom_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
