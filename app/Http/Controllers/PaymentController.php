<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Property;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'listing_id' => 'required|exists:properties,id',
        ]);

        $listing = Property::findOrFail($request->listing_id);
        $userId = auth()->id();

        $payment = Payment::create([
            'listing_id' => $listing->id,
            'user_id' => $userId,
            'rent_amount' => $listing->rent,
            'total_amount' => $listing->rent * 2,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Payment recorded']);
    }
    public function myPayments(Request $request)
{
    $user = auth()->user();

    $payments = Payment::with('listing')
        ->where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($payments);
}

}
