<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPaymentsController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $payments = Payment::with('listing')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json($payments);
    }
}

