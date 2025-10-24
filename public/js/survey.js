// アンケート管理システム
class SurveyManager {
    constructor() {
        this.surveys = [];
        this.categories = [];
        this.init();
    }

    /**
     * 初期化処理
     * APIからデータを取得して初期化
     */
    async init() {
        try {
            await this.loadSurveys();
            await this.loadCategories();
        } catch (error) {
            console.error('SurveyManager initialization failed:', error);
            // フォールバック: デモデータを使用
            this.createDemoSurveys();
        }
    }

    /**
     * APIからアンケート一覧を取得
     */
    async loadSurveys() {
        try {
            const response = await fetch('/api/surveys.json');
            const data = await response.json();
            
            if (data.success) {
                this.surveys = data.data;
            } else {
                throw new Error('Failed to load surveys from API');
            }
        } catch (error) {
            console.error('Failed to load surveys:', error);
            throw error;
        }
    }

    /**
     * APIからカテゴリー一覧を取得
     */
    async loadCategories() {
        try {
            const response = await fetch('/api/surveys-categories.json');
            const data = await response.json();
            
            if (data.success) {
                this.categories = data.data;
            } else {
                throw new Error('Failed to load categories from API');
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
            throw error;
        }
    }

    /**
     * デモアンケートデータの作成
     * 初期データとしてサンプルアンケートを作成
     */
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
            },
            {
                id: '4',
                title: 'ライフスタイルと健康習慣調査',
                description: '日常生活の習慣と健康管理について調査します',
                category: 'ライフスタイル',
                points: 120,
                estimatedTime: 8,
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: '1日の睡眠時間はどのくらいですか？',
                        options: ['6時間未満', '6-7時間', '7-8時間', '8時間以上']
                    },
                    {
                        id: 'q2',
                        type: 'multiple',
                        question: '日常的に行っている健康習慣を選択してください（複数選択可）',
                        options: ['運動', 'バランスの良い食事', '十分な睡眠', 'ストレス管理', 'その他']
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            },
            {
                id: '5',
                title: 'ゲームとエンターテイメント調査',
                description: 'ゲームやエンターテイメントの利用状況について調査します',
                category: 'エンターテイメント',
                points: 80,
                estimatedTime: 6,
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: 'ゲームをプレイする頻度はどのくらいですか？',
                        options: ['毎日', '週に数回', '月に数回', 'ほとんどしない']
                    },
                    {
                        id: 'q2',
                        type: 'single',
                        question: '好きなゲームジャンルはどれですか？',
                        options: ['RPG', 'アクション', 'パズル', 'シミュレーション', 'その他']
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            },
            {
                id: '6',
                title: '健康管理アプリの利用調査',
                description: '健康管理アプリやウェアラブルデバイスの利用状況を調査します',
                category: 'ヘルスケア',
                points: 90,
                estimatedTime: 5,
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: '健康管理アプリを使用していますか？',
                        options: ['使用している', '使用していない', '興味がある', '興味がない']
                    },
                    {
                        id: 'q2',
                        type: 'multiple',
                        question: '健康管理で重視している項目を選択してください（複数選択可）',
                        options: ['運動記録', '食事管理', '睡眠管理', '体重管理', 'その他']
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            },
            {
                id: '7',
                title: 'AIとテクノロジーの未来調査',
                description: '人工知能や最新テクノロジーに対する意識を調査します',
                category: 'テクノロジー',
                points: 180,
                estimatedTime: 12,
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: 'AI技術についてどの程度関心がありますか？',
                        options: ['非常に高い', '高い', '普通', '低い', '全くない']
                    },
                    {
                        id: 'q2',
                        type: 'text',
                        question: 'AI技術の活用で期待している分野があれば教えてください'
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            },
            {
                id: '8',
                title: 'サステナブルショッピング調査',
                description: '環境に配慮した買い物についての意識を調査します',
                category: 'ショッピング',
                points: 110,
                estimatedTime: 7,
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop',
                questions: [
                    {
                        id: 'q1',
                        type: 'single',
                        question: '環境に配慮した商品を選ぶ頻度はどのくらいですか？',
                        options: ['いつも', '時々', 'まれに', '全くない']
                    },
                    {
                        id: 'q2',
                        type: 'multiple',
                        question: '環境配慮で重視している点を選択してください（複数選択可）',
                        options: ['リサイクル素材', '省エネ', '地産地消', '包装の簡素化', 'その他']
                    }
                ],
                createdAt: new Date().toISOString(),
                status: 'active'
            }
        ];

        localStorage.setItem('survey_monitor_surveys', JSON.stringify(demoSurveys));
        this.surveys = demoSurveys;
    }

    /**
     * アンケート一覧の取得
     * APIからアンケートデータを取得
     * @returns {Array} アンケート配列
     */
    async getSurveys() {
        try {
            const response = await fetch('/api/surveys.json');
            const data = await response.json();
            
            if (data.success) {
                return data.data;
            } else {
                throw new Error('Failed to fetch surveys');
            }
        } catch (error) {
            console.error('Failed to fetch surveys:', error);
            // フォールバック: ローカルストレージから取得
            const surveys = localStorage.getItem('survey_monitor_surveys');
            return surveys ? JSON.parse(surveys) : [];
        }
    }

    /**
     * アンケート詳細の取得
     * APIからアンケート詳細を取得
     * @param {string} id - アンケートID
     * @returns {Object|null} アンケート詳細
     */
    async getSurvey(id) {
        try {
            const response = await fetch('/api/surveys.json');
            const data = await response.json();
            
            if (data.success) {
                return data.data.find(survey => survey.id == id);
            } else {
                throw new Error('Failed to fetch survey');
            }
        } catch (error) {
            console.error('Failed to fetch survey:', error);
            // フォールバック: ローカルストレージから取得
            return this.surveys.find(survey => survey.id === id);
        }
    }

    /**
     * アンケート回答の保存
     * APIに回答データを送信
     * @param {string} surveyId - アンケートID
     * @param {Object} responses - 回答データ
     * @returns {Object} 保存された回答データ
     */
    async saveResponse(surveyId, responses) {
        try {
            const response = await fetch(`/api/surveys/${surveyId}/response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.authManager.getToken()}`
                },
                body: JSON.stringify({
                    responses: responses,
                    completion_time: Date.now() - this.startTime // 仮の完了時間
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // ユーザーのポイント追加
                const survey = await this.getSurvey(surveyId);
                if (survey) {
                    window.authManager.addPoints(survey.points);
                }
                return data.data;
            } else {
                throw new Error(data.message || 'Failed to save response');
            }
        } catch (error) {
            console.error('Failed to save response:', error);
            // フォールバック: ローカルストレージに保存
            return this.saveResponseLocally(surveyId, responses);
        }
    }

    /**
     * ローカルストレージに回答を保存（フォールバック用）
     * @param {string} surveyId - アンケートID
     * @param {Object} responses - 回答データ
     * @returns {Object} 保存された回答データ
     */
    saveResponseLocally(surveyId, responses) {
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

    /**
     * 回答データの取得
     * @returns {Array} 回答データ配列
     */
    getResponses() {
        const responses = localStorage.getItem('survey_monitor_responses');
        return responses ? JSON.parse(responses) : [];
    }

    /**
     * ユーザーの回答済みアンケート取得
     * @param {string} userId - ユーザーID
     * @returns {Array} 回答済みアンケート配列
     */
    getUserCompletedSurveys(userId) {
        const responses = this.getResponses();
        return responses.filter(response => response.userId === userId);
    }

    /**
     * アンケート統計の取得
     * @param {string} surveyId - アンケートID
     * @returns {Object} 統計データ
     */
    getSurveyStats(surveyId) {
        const responses = this.getResponses();
        const surveyResponses = responses.filter(response => response.surveyId === surveyId);
        
        return {
            totalResponses: surveyResponses.length,
            completionRate: surveyResponses.length / 100, // 仮の計算
            averageTime: 5.5 // 仮の値
        };
    }

    /**
     * カテゴリー別アンケート取得
     * APIからカテゴリー別のアンケートを取得
     * @param {string} category - カテゴリー名
     * @returns {Array} カテゴリー別アンケート配列
     */
    async getSurveysByCategory(category) {
        try {
            const response = await fetch('/api/surveys.json');
            const data = await response.json();
            
            if (data.success) {
                return data.data.filter(survey => survey.category === category);
            } else {
                throw new Error('Failed to fetch surveys by category');
            }
        } catch (error) {
            console.error('Failed to fetch surveys by category:', error);
            // フォールバック: ローカルストレージから取得
            const surveys = this.getSurveys();
            return surveys.filter(survey => survey.category === category);
        }
    }

    /**
     * 利用可能なアンケート取得（未回答のもの）
     * APIから利用可能なアンケートを取得
     * @param {string} userId - ユーザーID
     * @returns {Array} 利用可能なアンケート配列
     */
    async getAvailableSurveys(userId) {
        try {
            const response = await fetch('/api/surveys.json');
            const data = await response.json();
            
            if (data.success) {
                // ユーザーの回答済みアンケートを取得
                const userResponses = await this.getUserResponses();
                const completedIds = userResponses.map(response => response.survey_id);
                
                // 未回答のアンケートのみを返す
                return data.data.filter(survey => 
                    survey.status === 'active' && !completedIds.includes(survey.id)
                );
            } else {
                throw new Error('Failed to fetch available surveys');
            }
        } catch (error) {
            console.error('Failed to fetch available surveys:', error);
            // フォールバック: ローカルストレージから取得
            const completedSurveys = this.getUserCompletedSurveys(userId);
            const completedIds = completedSurveys.map(response => response.surveyId);
            
            return this.surveys.filter(survey => 
                survey.status === 'active' && !completedIds.includes(survey.id)
            );
        }
    }

    /**
     * ユーザーの回答データをAPIから取得
     * @returns {Array} ユーザーの回答データ配列
     */
    async getUserResponses() {
        try {
            const response = await fetch('/api/surveys/user/responses', {
                headers: {
                    'Authorization': `Bearer ${window.authManager.getToken()}`
                }
            });
            const data = await response.json();
            
            if (data.success) {
                return data.data;
            } else {
                throw new Error('Failed to fetch user responses');
            }
        } catch (error) {
            console.error('Failed to fetch user responses:', error);
            // フォールバック: ローカルストレージから取得
            return this.getResponses().filter(response => 
                response.userId === window.authManager.currentUser?.id
            );
        }
    }
}

// グローバルアンケートマネージャー
window.surveyManager = new SurveyManager();
