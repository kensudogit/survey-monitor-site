<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * ダッシュボードコントローラー
 * 
 * ユーザーの個人ダッシュボードを表示するコントローラー
 * ポイント残高、収益、完了アンケート数、利用可能アンケートを提供
 */
class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $stats = [
            'totalPoints' => $user->points,
            'totalEarnings' => $user->total_earnings,
            'surveysCompleted' => $user->responses()->count(),
            'recentTransactions' => $user->pointsTransactions()->latest()->take(5)->get()
        ];

        $availableSurveys = \App\Models\Survey::where('status', 'active')
            ->whereDoesntHave('responses', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->take(5)
            ->get();

        return view('dashboard', compact('stats', 'availableSurveys'));
    }
}
