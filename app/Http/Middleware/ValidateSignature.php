<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * 署名検証ミドルウェア
 * 
 * URL署名の有効性を検証するミドルウェア
 * 一時的なURLやメール認証リンクなどのセキュリティを確保
 */
class ValidateSignature
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasValidSignature($request)) {
            return $next($request);
        }

        abort(403, 'Invalid signature.');
    }
}
