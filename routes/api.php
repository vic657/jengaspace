<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\LandlordRequest;
use App\Http\Controllers\PropertyController;
use App\Models\Property;
use App\Http\Controllers\GeneralUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\LandlordPaymentController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\AdminController;

Route::middleware('auth:sanctum')->get('/admin/tenants', [AdminController::class, 'getTenants']);
Route::get('/admin/visible-listings', [AdminController::class, 'getVisibleListings']);
Route::put('/admin/listings/{id}/hide', [ListingController::class, 'hide']);
Route::get('/admin/listings', [AdminController::class, 'getAllListings']);
Route::get('/admin/listings/hidden', [AdminController::class, 'getHiddenListings']);
Route::middleware('auth:sanctum')->get('/admin/listings', [AdminController::class, 'getVisibleListings']);
Route::put('/admin/listings/{id}/unhide', [AdminController::class, 'unhide']);
Route::middleware('auth:sanctum')->post('/properties', [PropertyController::class, 'store']);
Route::middleware('auth:sanctum')->get('/landlord/properties', [PropertyController::class, 'myListings']);
Route::get('/listings', function () {
    return Property::with('user')->latest()->get();
});
Route::middleware('auth:sanctum')->get('/landlord/payments', [LandlordPaymentController::class, 'index']);
Route::get('/listings', [ListingController::class, 'index']);
Route::middleware('auth:sanctum')->post('/payments/{id}/confirm', [LandlordPaymentController::class, 'confirm']);

Route::middleware(['auth:sanctum'])->get('/my-payments', [UserPaymentsController::class, 'index']);
Route::middleware('auth:sanctum')->get('/my-payments', [PaymentController::class, 'myPayments']);

Route::middleware('auth:sanctum')->post('/payments', [PaymentController::class, 'store']);
Route::post('/general-login', [AuthController::class, 'generalLogin']);
Route::post('/general-user/register', [GeneralUserController::class, 'register']);
Route::middleware('api')->group(function () {


   // LOGIN ROUTE
        Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Try logging in from users table
    $credentials = $request->only('email', 'password');
    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin ?? false,
                'is_approved' => true,
            ],
        ]);
    }

    // If not in users, try landlord_requests
    $landlord = LandlordRequest::where('email', $request->email)->first();

    if ($landlord && Hash::check($request->password, $landlord->password)) {
        return response()->json([
            'access_token' => base64_encode($landlord->email), // Simulated token
            'token_type' => 'Bearer',
            'user' => [
                'id' => $landlord->id,
                'name' => $landlord->name,
                'email' => $landlord->email,
                'is_admin' => false,
                'is_approved' => false,
            ],
        ]);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
});



    // LANDLORD REGISTRATION (after agreement + simulated payment)
    Route::post('/landlord/register', function (Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email|unique:landlord_requests,email',
            'id_number' => 'required|string|unique:landlord_requests,id_number',
            'location' => 'required|string',
            'password' => 'required|string|min:6',
            'registration_fee' => 'required|numeric|min:10000',
        ]);
        if ($request->registration_fee != 10000) {
        return response()->json([
            'message' => 'Please pay the full registration fee of 10,000 to complete registration.'
        ], 422);
    }

        LandlordRequest::create([
            'name' => $request->name,
            'email' => $request->email,
            'id_number' => $request->id_number,
            'location' => $request->location,
            'password' => Hash::make($request->password), // Save password here temporarily
            'status' => 'pending',
            'registration_fee' => $request->registration_fee,
        ]);

        return response()->json([
            'message' => 'Registration submitted. Awaiting admin approval.'
        ]);
    });

    // ADMIN: View landlord requests
    Route::middleware('auth:sanctum')->get('/admin/landlord-requests', function () {
        if (!Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return LandlordRequest::orderBy('created_at', 'desc')->get();
    });

    // ADMIN: Approve landlord
    Route::middleware('auth:sanctum')->post('/admin/approve-request/{id}', function ($id) {
    if (!Auth::user()->is_admin) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $request = LandlordRequest::findOrFail($id);

    // Avoid duplicate users
    if (!User::where('email', $request->email)->exists()) {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Already hashed
            'is_admin' => false,
        ]);
    }

    $request->status = 'approved';
    $request->save();

    return response()->json(['message' => 'Landlord approved successfully']);
});
    // LANDLORD: Check status
    Route::middleware('auth:sanctum')->get('/landlord/status', function (Request $request) {
        $email = $request->user()->email;

        $record = LandlordRequest::where('email', $email)->first();

        if (!$record) {
            return response()->json(['status' => 'not_found'], 404);
        }

        return response()->json([
            'status' => $record->status,
            'name' => $record->name,
            'location' => $record->location,
        ]);
    });
   
Route::middleware(['auth:sanctum'])->post('/landlord/properties', [PropertyController::class, 'store']);
Route::middleware('auth:sanctum')->get('/admin/landlords', function () {
    if (!Auth::user()->is_admin) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $approved = User::with('properties')
        ->where('is_admin', false)
        ->whereIn('email', LandlordRequest::where('status', 'approved')->pluck('email'))
        ->get();

    $pending = LandlordRequest::where('status', 'pending')->get();

    return response()->json([
        'approved' => $approved,
        'pending' => $pending
    ]);
});


});
