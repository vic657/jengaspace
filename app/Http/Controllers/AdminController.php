<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getTenants()
{
    $tenants = Payment::with([
        'user:id,name,email,id_number,phone',
        'listing.user:id,name,email,phone' 
    ])
    ->where('status', 'confirmed')
    ->get()
    ->map(function ($payment) {
        return [
            'id' => $payment->user->id,
            'name' => $payment->user->name,
            'email' => $payment->user->email,
            'id_number' => $payment->user->id_number,
            'phone' => $payment->user->phone,
            'property' => $payment->listing, 
            'amount' => $payment->amount,
            'status' => $payment->status,
        ];
    });

    return response()->json($tenants);
}

}

