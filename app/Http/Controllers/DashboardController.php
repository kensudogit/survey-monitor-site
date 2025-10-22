<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SurveyResponse;
use App\Models\UserPointsHistory;
use App\Models\UserEarningsHistory;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Show user dashboard
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get available surveys for user
        $availableSurveys = Survey::with('category')
            ->where('is_active', true)
            ->where('start_date', '<=', now())
            ->where(function ($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now());
            })
            ->whereRaw('current_responses < max_responses')
            ->whereNotIn('id', $user->surveyResponses()->pluck('survey_id'))
            ->orderBy('priority', 'desc')
            ->limit(5)
            ->get();

        // Get recent responses
        $recentResponses = $user->surveyResponses()
            ->with('survey')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get points history
        $pointsHistory = $user->pointsHistory()
            ->with('survey')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Get earnings history
        $earningsHistory = $user->earningsHistory()
            ->with('survey')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Calculate statistics
        $stats = [
            'total_surveys_completed' => $user->surveyResponses()->completed()->count(),
            'total_points_earned' => $user->pointsHistory()->where('type', 'earned')->sum('points'),
            'total_earnings' => $user->earningsHistory()->where('status', 'completed')->sum('amount'),
            'current_points' => $user->points,
            'this_month_surveys' => $user->surveyResponses()
                ->completed()
                ->whereMonth('completed_at', now()->month)
                ->count(),
        ];

        return view('dashboard', compact('availableSurveys', 'recentResponses', 'pointsHistory', 'earningsHistory', 'stats'));
    }

    /**
     * Show user profile
     */
    public function profile()
    {
        $user = Auth::user();
        return view('profile', compact('user'));
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'name' => 'required|string|max:255',
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

        $user->update($request->only([
            'name', 'phone', 'birth_date', 'gender', 'prefecture', 
            'city', 'occupation', 'annual_income', 'family_structure', 'interests'
        ]));

        return redirect()->back()->with('success', 'プロフィールが更新されました。');
    }

    /**
     * Show points history
     */
    public function pointsHistory()
    {
        $user = Auth::user();
        $pointsHistory = $user->pointsHistory()
            ->with('survey')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return view('points-history', compact('pointsHistory'));
    }

    /**
     * Show earnings history
     */
    public function earningsHistory()
    {
        $user = Auth::user();
        $earningsHistory = $user->earningsHistory()
            ->with('survey')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return view('earnings-history', compact('earningsHistory'));
    }
}

