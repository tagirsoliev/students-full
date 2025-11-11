<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use Auth;
use Illuminate\Http\Request;
use Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = Str::random(60);

        ApiToken::create([
            'user_id' => $user->id,
            'token' => hash('sha256', $token),
        ]);
        return response()->json(['token' => $token], 200);
    }
}
