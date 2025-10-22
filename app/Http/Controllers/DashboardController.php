<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
