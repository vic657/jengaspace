<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;


class LandlordPaymentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $payments = Payment::with(['listing', 'user'])
            ->whereHas('listing', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->get();

        return response()->json($payments);
    }
   public function confirm($id)
{
    $payment = Payment::with(['listing.user', 'user'])->findOrFail($id); // 👈 include listing.user

    if (Auth::user()->id !== $payment->listing->user_id && Auth::user()->role !== 'admin') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $payment->status = 'confirmed';

    $pdf = Pdf::loadView('receipt', [
        'payment' => $payment,
        'user' => $payment->user,
        'listing' => $payment->listing,
        'landlord' => $payment->listing->user, // 👈 include landlord
    ]);

    $filename = 'receipt_' . $payment->id . '.pdf';
    $receiptPath = 'receipts/' . $filename;

    Storage::disk('public')->put($receiptPath, $pdf->output());

    $payment->receipt_path = 'storage/' . $receiptPath;
    $payment->save();

    return response()->json([
        'message' => 'Payment confirmed and receipt generated',
        'receipt_url' => asset($payment->receipt_path),
    ]);
}



}

