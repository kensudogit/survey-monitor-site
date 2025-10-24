<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyCategory;
use App\Models\SurveyResponse;
use Illuminate\Http\JsonResponse;

/**
 * アンケートAPIコントローラー
 * 
 * アンケート関連のAPIエンドポイントを提供
 */
class SurveyController extends Controller
{
    /**
     * アンケート一覧の取得
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = Survey::active()->with('responses');

        // カテゴリー別フィルタリング
        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // 検索キーワード
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // ソート
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // ページネーション
        $perPage = $request->get('per_page', 12);
        $surveys = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $surveys->items(),
            'pagination' => [
                'current_page' => $surveys->currentPage(),
                'last_page' => $surveys->lastPage(),
                'per_page' => $surveys->perPage(),
                'total' => $surveys->total(),
            ],
        ]);
    }

    /**
     * アンケート詳細の取得
     * 
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $survey = Survey::active()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $survey,
        ]);
    }

    /**
     * アンケートカテゴリー一覧の取得
     * 
     * @return JsonResponse
     */
    public function categories(): JsonResponse
    {
        $categories = SurveyCategory::active()->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * アンケート回答の保存
     * 
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function submitResponse(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'responses' => 'required|array',
            'completion_time' => 'nullable|integer|min:1',
        ]);

        $survey = Survey::active()->findOrFail($id);
        $user = auth()->user();

        // 既に回答済みかチェック
        $existingResponse = SurveyResponse::where('survey_id', $id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingResponse) {
            return response()->json([
                'success' => false,
                'message' => 'このアンケートは既に回答済みです。',
            ], 400);
        }

        // 回答データの保存
        $response = SurveyResponse::create([
            'survey_id' => $id,
            'user_id' => $user->id,
            'responses' => $request->responses,
            'completion_time' => $request->completion_time,
            'completed_at' => now(),
        ]);

        // ユーザーのポイント追加
        $user->increment('points', $survey->points);

        return response()->json([
            'success' => true,
            'message' => 'アンケートへの回答が完了しました。',
            'data' => $response,
            'points_earned' => $survey->points,
        ]);
    }

    /**
     * ユーザーの回答済みアンケート取得
     * 
     * @return JsonResponse
     */
    public function userResponses(): JsonResponse
    {
        $user = auth()->user();
        $responses = SurveyResponse::where('user_id', $user->id)
            ->with('survey')
            ->orderBy('completed_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $responses,
        ]);
    }

    /**
     * アンケート統計の取得
     * 
     * @param string $id
     * @return JsonResponse
     */
    public function stats(string $id): JsonResponse
    {
        $survey = Survey::findOrFail($id);
        $responses = $survey->responses();

        $stats = [
            'total_responses' => $responses->count(),
            'completion_rate' => $survey->completion_rate,
            'average_completion_time' => $responses->avg('completion_time'),
            'recent_responses' => $responses->where('completed_at', '>=', now()->subDays(7))->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * ダッシュボード用の統計データ取得
     * 
     * @return JsonResponse
     */
    public function dashboardStats(): JsonResponse
    {
        $stats = [
            'total_surveys' => Survey::active()->count(),
            'total_responses' => SurveyResponse::count(),
            'total_categories' => SurveyCategory::active()->count(),
            'recent_surveys' => Survey::active()
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
            'category_stats' => SurveyCategory::active()
                ->withCount('surveys')
                ->get(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }
}