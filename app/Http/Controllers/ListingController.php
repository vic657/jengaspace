<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Payment;

class ListingController extends Controller
{
    public function index()
    {
        $properties = Property::with('user')->latest()->get();

        $properties->transform(function ($property) {
            $hasConfirmedPayment = Payment::where('listing_id', $property->id)
                ->where('status', 'confirmed')
                ->exists();

            $property->status = $hasConfirmedPayment ? 'rented' : 'available';

            $property->living_room_image = $property->living_room_image ? asset('storage/' . $property->living_room_image) : null;
            $property->bedroom_image = $property->bedroom_image ? asset('storage/' . $property->bedroom_image) : null;
            $property->kitchen_image = $property->kitchen_image ? asset('storage/' . $property->kitchen_image) : null;
            $property->bathroom_image = $property->bathroom_image ? asset('storage/' . $property->bathroom_image) : null;

            return $property;
        });

        return response()->json($properties);
    }
    

public function hide($id)
{
    $listing = Property::findOrFail($id);
    $listing->hidden = !$listing->hidden; // toggle hidden
    $listing->save();

    return response()->json([
        'message' => $listing->hidden ? 'Listing hidden successfully' : 'Listing is now visible',
        'hidden' => $listing->hidden,
    ]);
}

}

