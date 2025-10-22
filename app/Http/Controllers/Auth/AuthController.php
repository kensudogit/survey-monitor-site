<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Show login form
     */
    public function showLogin()
    {
        return view('auth.login');
    }

    /**
     * Handle login request
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $credentials = $request->only('email', 'password');
        $remember = $request->has('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            
            // Update last login time
            Auth::user()->update(['last_login_at' => now()]);
            
            return redirect()->intended('/dashboard');
        }

        return redirect()->back()
            ->withErrors(['email' => 'ログイン情報が正しくありません。'])
            ->withInput();
    }

    /**
     * Show registration form
     */
    public function showRegister()
    {
        return view('auth.register');
    }

    /**
     * Handle registration request
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date|before:today',
            'gender' => 'nullable|in:male,female,other,prefer_not_to_say',
            'prefecture' => 'nullable|string|max:50',
            'city' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'annual_income' => 'nullable|in:under_3m,3m_5m,5m_7m,7m_10m,10m_15m,15m_20m,over_20m,prefer_not_to_say',
            'family_structure' => 'nullable|in:single,couple,family_with_children,extended_family,other',
            'interests' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'prefecture' => $request->prefecture,
            'city' => $request->city,
            'occupation' => $request->occupation,
            'annual_income' => $request->annual_income,
            'family_structure' => $request->family_structure,
            'interests' => $request->interests,
        ]);

        // Award welcome bonus points
        $welcomeBonus = 1000; // From site settings
        $user->addPoints($welcomeBonus, 'bonus', '新規登録ボーナス');

        Auth::login($user);

        return redirect('/dashboard')->with('success', 'アカウントが作成されました！ウェルカムボーナスとして' . $welcomeBonus . 'ポイントをプレゼントしました。');
    }

    /**
     * Handle logout request
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

