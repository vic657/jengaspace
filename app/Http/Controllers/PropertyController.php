<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
            'bedrooms' => 'nullable|integer',
            'location' => 'required|string',
            'terms_of_service' => 'required|string',
            'contact_info' => 'required|string',

            'rent' => 'required|numeric',
            'description' => 'nullable|string',
            'livingRoom' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'bedroom'    => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'kitchen'    => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'bathroom'   => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $property = new Property();
        $property->user_id = Auth::id();
        $property->category = $request->category;
        $property->bedrooms = $request->bedrooms ?? null;
        $property->location = $request->location;
        $property->rent = $request->rent;
        $property->description = $request->description ?? '';
        $property->terms_of_service = $request->terms_of_service;
        $property->contact_info = $request->contact_info;


        // Correct field name mapping
        $imageFields = [
            'livingRoom' => 'living_room_image',
            'bedroom'    => 'bedroom_image',
            'kitchen'    => 'kitchen_image',
            'bathroom'   => 'bathroom_image',
        ];

        foreach ($imageFields as $formField => $dbField) {
            if ($request->hasFile($formField)) {
                $path = $request->file($formField)->store('property_images', 'public');
                $property->{$dbField} = $path;
            }
        }

        $property->save();

        return response()->json([
            'message' => 'Property added successfully!',
            'property' => $property
        ], 201);
    }
    public function myListings(Request $request)
{
    $user = Auth::user(); 

    $properties = Property::where('user_id', $user->id)
        ->latest()
        ->get()
        ->map(function ($property) {
            $property->living_room_image = $property->living_room_image ? asset('storage/' . $property->living_room_image) : null;
            $property->bedroom_image = $property->bedroom_image ? asset('storage/' . $property->bedroom_image) : null;
            $property->kitchen_image = $property->kitchen_image ? asset('storage/' . $property->kitchen_image) : null;
            $property->bathroom_image = $property->bathroom_image ? asset('storage/' . $property->bathroom_image) : null;
            return $property;
        });

    return response()->json([
        'message' => 'Listings fetched successfully',
        'properties' => $properties,
    ]);
}


}
