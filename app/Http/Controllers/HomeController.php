<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyCategory;
use App\Models\User;

class HomeController extends Controller
{
    /**
     * Display the home page
     */
    public function index()
    {
        $featuredSurveys = Survey::with('category')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->where('start_date', '<=', now())
            ->where(function ($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now());
            })
            ->whereRaw('current_responses < max_responses')
            ->orderBy('priority', 'desc')
            ->limit(6)
            ->get();

        $categories = SurveyCategory::active()->ordered()->get();

        $stats = [
            'total_surveys' => Survey::where('is_active', true)->count(),
            'total_users' => User::where('is_active', true)->count(),
            'total_responses' => \App\Models\SurveyResponse::completed()->count(),
        ];

        return view('home', compact('featuredSurveys', 'categories', 'stats'));
    }

    /**
     * Display surveys by category
     */
    public function surveys(Request $request)
    {
        $query = Survey::with('category')
            ->where('is_active', true)
            ->where('start_date', '<=', now())
            ->where(function ($q) {
                $q->whereNull('end_date')
                  ->orWhere('end_date', '>=', now());
            })
            ->whereRaw('current_responses < max_responses');

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->where('category_id', $request->category);
        }

        // Filter by search term
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $surveys = $query->orderBy('priority', 'desc')
                        ->orderBy('created_at', 'desc')
                        ->paginate(12);

        $categories = SurveyCategory::active()->ordered()->get();

        return view('surveys.index', compact('surveys', 'categories'));
    }

    /**
     * Display a specific survey
     */
    public function showSurvey(Survey $survey)
    {
        if (!$survey->is_active) {
            abort(404);
        }

        $survey->load('questions.options');
        
        return view('surveys.show', compact('survey'));
    }
}

