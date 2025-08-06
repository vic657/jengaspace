<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LandlordRequest;
use Illuminate\Support\Facades\DB;

class AdminFinanceController extends Controller
{
   public function getFinanceStats()
{
    // Total registration fees paid
    $totalFees = LandlordRequest::where('status', 'approved')
        ->sum('registration_fee');

    // Total approved landlords
    $approvedLandlords = LandlordRequest::where('status', 'approved')->count();

    // All confirmed payments
    $payments = DB::table('payments')->where('status', 'confirmed')->get();

    $total_rent_income = 0;
    $commission = 0;

    foreach ($payments as $payment) {
        $total_rent_income += $payment->rent_amount;

        if ($payment->rent_amount < 15000) {
            $commission += $payment->rent_amount * 0.07; // 7% commission
        } else {
            $commission += $payment->rent_amount * 0.10; // 10% commission
        }
    }

    $rent_income_after_commission = $total_rent_income - $commission;

    return response()->json([
        'total_fees' => $totalFees,
        'approved_landlords' => $approvedLandlords,
        'total_rent_income' => $total_rent_income,
        'commission_earned' => $commission,
        'rent_income' => $rent_income_after_commission,
    ]);
}

}
