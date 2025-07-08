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
}
