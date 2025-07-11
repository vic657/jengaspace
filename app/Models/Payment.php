<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'user_id',
        'rent_amount',
        'total_amount',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(GeneralUser::class);
    }

    public function listing()
    {
        return $this->belongsTo(Property::class, 'listing_id');
    }
}
