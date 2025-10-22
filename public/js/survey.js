// アンケート管理システム
class SurveyManager {
    constructor() {
        this.surveys = this.getSurveys();
        this.init();
    }

    init() {
        // デモデータがなければ作成
        if (this.surveys.length === 0) {
            this.createDemoSurveys();
        }
    }

    // デモアンケートデータ作成
    createDemoSurveys() {
        const demoSurveys = [
            {
                id: '1',
                title: 'スマートフォンアプリの使用状況調査',
                description: '日常的なスマートフォンアプリの利用状況について調査します',
                category: 'テクノロジー',
                points: 100,
                estimatedTime: 5,
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: '普段使用しているスマートフォンのOSは何ですか？',
                        options: ['iOS', 'Android', 'その他', '使用していない']
                    },
                    {
                        id: 'q2',
                        type: 'multiple',
                        question: 'よく使用するアプリの種類を選択してください（複数選択可）',
                        options: ['SNS', 'ゲーム', '動画配信', 'ニュース', '買い物', 'その他']
                    },
                    {
                        id: 'q3',
                        type: 'text',
                        question: 'スマートフォンアプリで改善してほしい機能があれば教えてください'
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            },
            {
                id: '2',
                title: 'オンラインショッピングの満足度調査',
                description: 'ECサイトでの買い物体験についてお聞きします',
                category: 'ショッピング',
                points: 150,
                estimatedTime: 7,
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: 'オンラインショッピングの頻度はどのくらいですか？',
                        options: ['毎日', '週に数回', '月に数回', '年に数回', 'ほとんどしない']
                    },
                    {
                        id: 'q2',
                        type: 'single',
                        question: 'よく利用するECサイトはどれですか？',
                        options: ['Amazon', '楽天市場', 'Yahoo!ショッピング', 'その他']
                    },
                    {
                        id: 'q3',
                        type: 'rating',
                        question: 'オンラインショッピングの満足度を5段階で評価してください',
                        scale: 5
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            },
            {
                id: '3',
                title: '働き方改革に関する意識調査',
                description: 'リモートワークや働き方についての意識を調査します',
                category: 'ビジネス',
                points: 200,
                estimatedTime: 10,
                image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: '現在の働き方はどれに近いですか？',
                        options: ['完全出社', 'ハイブリッド（出社とリモート）', '完全リモート', 'その他']
                    },
                    {
                        id: 'q2',
                        type: 'multiple',
                        question: 'リモートワークのメリットを選択してください（複数選択可）',
                        options: ['通勤時間の削減', '集中力の向上', 'ワークライフバランスの改善', 'コスト削減', 'その他']
                    },
                    {
                        id: 'q3',
                        type: 'text',
                        question: '働き方改革についてご意見をお聞かせください'
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            }
        ];

        localStorage.setItem('survey_monitor_surveys', JSON.stringify(demoSurveys));
        this.surveys = demoSurveys;
    }

    // アンケート一覧取得
    getSurveys() {
        const surveys = localStorage.getItem('survey_monitor_surveys');
        return surveys ? JSON.parse(surveys) : [];
    }

    // アンケート詳細取得
    getSurvey(id) {
        return this.surveys.find(survey => survey.id === id);
    }

    // アンケート回答保存
    saveResponse(surveyId, responses) {
        const responseData = {
            id: Date.now().toString(),
            surveyId: surveyId,
            userId: window.authManager.currentUser?.id,
            responses: responses,
            completedAt: new Date().toISOString()
        };

        const existingResponses = this.getResponses();
        existingResponses.push(responseData);
        localStorage.setItem('survey_monitor_responses', JSON.stringify(existingResponses));

        // ユーザーのポイント追加とアンケート完了記録
        const survey = this.getSurvey(surveyId);
        if (survey) {
            window.authManager.addPoints(survey.points);
            window.authManager.completeSurvey(surveyId);
        }

        return responseData;
    }

    // 回答データ取得
    getResponses() {
        const responses = localStorage.getItem('survey_monitor_responses');
        return responses ? JSON.parse(responses) : [];
    }

    // ユーザーの回答済みアンケート取得
    getUserCompletedSurveys(userId) {
        const responses = this.getResponses();
        return responses.filter(response => response.userId === userId);
    }

    // アンケート統計取得
    getSurveyStats(surveyId) {
        const responses = this.getResponses();
        const surveyResponses = responses.filter(response => response.surveyId === surveyId);
        
        return {
            totalResponses: surveyResponses.length,
            completionRate: surveyResponses.length / 100, // 仮の計算
            averageTime: 5.5 // 仮の値
        };
    }

    // カテゴリー別アンケート取得
    getSurveysByCategory(category) {
        return this.surveys.filter(survey => survey.category === category);
    }

    // 利用可能なアンケート取得（未回答のもの）
    getAvailableSurveys(userId) {
        const completedSurveys = this.getUserCompletedSurveys(userId);
        const completedIds = completedSurveys.map(response => response.surveyId);
        
        return this.surveys.filter(survey => 
            survey.status === 'active' && !completedIds.includes(survey.id)
        );
    }
}

// グローバルアンケートマネージャー
window.surveyManager = new SurveyManager();
