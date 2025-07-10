<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GeneralUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class GeneralUserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:general_users',
            'phone'     => 'required|string|max:20',
            'id_number' => 'required|string|max:20',
            'password'  => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = GeneralUser::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'phone'     => $request->phone,
            'id_number' => $request->id_number,
            'password'  => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'General user registered successfully',
            'user'    => $user
        ], 201);
    }
}
