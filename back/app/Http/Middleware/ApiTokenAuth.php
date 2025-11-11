<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\ApiToken;


class ApiTokenAuth
{

    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        $tokenModel = $token
            ? ApiToken::where('token', hash('sha256', $token))->first()
            : null;

        if (!$tokenModel || !$tokenModel->user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->setUserResolver(fn() => $tokenModel->user);

        return $next($request);
    }
}
