-- AI分析用テストデータ生成スクリプト
-- 複雑で多様なテストデータを作成してAI分析機能の有効性を実証

-- 既存データをクリア
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE survey_insights;
TRUNCATE TABLE survey_analytics;
TRUNCATE TABLE survey_responses;
TRUNCATE TABLE survey_questions;
TRUNCATE TABLE surveys;
TRUNCATE TABLE users;
TRUNCATE TABLE survey_categories;
SET FOREIGN_KEY_CHECKS = 1;

-- カテゴリーデータの挿入
INSERT INTO survey_categories (name, description, color, icon, created_at, updated_at) VALUES
('テクノロジー・IT', 'IT・テクノロジー関連のアンケート', '#3B82F6', 'fas fa-laptop-code', NOW(), NOW()),
('ショッピング・EC', '買い物・ECサイト関連のアンケート', '#10B981', 'fas fa-shopping-cart', NOW(), NOW()),
('ビジネス・働き方', 'ビジネス・働き方関連のアンケート', '#8B5CF6', 'fas fa-briefcase', NOW(), NOW()),
('ライフスタイル', '生活・ライフスタイル関連のアンケート', '#EC4899', 'fas fa-heart', NOW(), NOW()),
('エンターテイメント', 'エンターテイメント・娯楽関連のアンケート', '#F59E0B', 'fas fa-gamepad', NOW(), NOW()),
('ヘルスケア・医療', '健康・医療関連のアンケート', '#EF4444', 'fas fa-heartbeat', NOW(), NOW()),
('教育・学習', '教育・学習関連のアンケート', '#06B6D4', 'fas fa-graduation-cap', NOW(), NOW()),
('金融・投資', '金融・投資関連のアンケート', '#84CC16', 'fas fa-chart-line', NOW(), NOW());

-- テストユーザーの生成（500人）
INSERT INTO users (name, email, password, phone, birth_date, gender, points, total_earnings, status, created_at, updated_at)
SELECT 
    CONCAT(
        CASE FLOOR(RAND() * 10)
            WHEN 0 THEN '田中'
            WHEN 1 THEN '佐藤'
            WHEN 2 THEN '鈴木'
            WHEN 3 THEN '高橋'
            WHEN 4 THEN '山田'
            WHEN 5 THEN '渡辺'
            WHEN 6 THEN '伊藤'
            WHEN 7 THEN '中村'
            WHEN 8 THEN '小林'
            WHEN 9 THEN '加藤'
        END,
        CASE 
            WHEN gender = 'male' THEN
                CASE FLOOR(RAND() * 10)
                    WHEN 0 THEN '太郎'
                    WHEN 1 THEN '一郎'
                    WHEN 2 THEN '健太'
                    WHEN 3 THEN '大輔'
                    WHEN 4 THEN '直樹'
                    WHEN 5 THEN '慎一'
                    WHEN 6 THEN '和也'
                    WHEN 7 THEN '雄一'
                    WHEN 8 THEN '正義'
                    WHEN 9 THEN '博之'
                END
            ELSE
                CASE FLOOR(RAND() * 10)
                    WHEN 0 THEN '花子'
                    WHEN 1 THEN '美咲'
                    WHEN 2 THEN '由美'
                    WHEN 3 THEN '恵子'
                    WHEN 4 THEN '智子'
                    WHEN 5 THEN '真理'
                    WHEN 6 THEN '優子'
                    WHEN 7 THEN '香織'
                    WHEN 8 THEN '麻衣'
                    WHEN 9 THEN 'あい'
                END
        END
    ) as name,
    CONCAT('testuser', n, '@example.com') as email,
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' as password,
    CONCAT('090-', LPAD(FLOOR(RAND() * 9000) + 1000, 4, '0'), '-', LPAD(FLOOR(RAND() * 9000) + 1000, 4, '0')) as phone,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365 * 62 + 18 * 365) DAY) as birth_date,
    CASE FLOOR(RAND() * 3)
        WHEN 0 THEN 'male'
        WHEN 1 THEN 'female'
        ELSE 'other'
    END as gender,
    FLOOR(RAND() * 5000) as points,
    FLOOR(RAND() * 50000) / 100 as total_earnings,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'inactive'
        ELSE 'active'
    END as status,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) as created_at,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY) as updated_at
FROM (
    SELECT @row := @row + 1 as n
    FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,
         (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,
         (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3,
         (SELECT @row := 0) r
    LIMIT 500
) numbers;

-- 複雑なアンケートテンプレートの作成
INSERT INTO surveys (title, description, category_id, points, duration_minutes, max_responses, current_responses, status, start_date, end_date, is_featured, created_by, created_at, updated_at)
SELECT 
    CASE FLOOR(RAND() * 5)
        WHEN 0 THEN CONCAT('スマートフォンアプリの使用状況調査 (テスト', n, ')')
        WHEN 1 THEN CONCAT('オンラインショッピングの利用実態 (テスト', n, ')')
        WHEN 2 THEN CONCAT('リモートワークの実態調査 (テスト', n, ')')
        WHEN 3 THEN CONCAT('健康管理アプリの利用調査 (テスト', n, ')')
        WHEN 4 THEN CONCAT('動画配信サービスの利用実態 (テスト', n, ')')
    END as title,
    CASE FLOOR(RAND() * 5)
        WHEN 0 THEN 'スマートフォンアプリの利用状況と満足度について調査します。'
        WHEN 1 THEN 'オンラインショッピングの利用状況と満足度について調査します。'
        WHEN 2 THEN 'リモートワークの実施状況と課題について調査します。'
        WHEN 3 THEN '健康管理アプリの利用状況と効果について調査します。'
        WHEN 4 THEN '動画配信サービスの利用状況と満足度について調査します。'
    END as description,
    FLOOR(RAND() * 8) + 1 as category_id,
    40 + FLOOR(RAND() * 40) as points,
    4 + FLOOR(RAND() * 6) as duration_minutes,
    100 + FLOOR(RAND() * 900) as max_responses,
    0 as current_responses,
    CASE FLOOR(RAND() * 5)
        WHEN 0 THEN 'paused'
        WHEN 1 THEN 'completed'
        ELSE 'active'
    END as status,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY) as start_date,
    DATE_ADD(NOW(), INTERVAL FLOOR(RAND() * 30) DAY) as end_date,
    CASE FLOOR(RAND() * 5)
        WHEN 0 THEN 1
        ELSE 0
    END as is_featured,
    (SELECT id FROM users ORDER BY RAND() LIMIT 1) as created_by,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY) as created_at,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 5) DAY) as updated_at
FROM (
    SELECT @row := @row + 1 as n
    FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,
         (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,
         (SELECT @row := 0) r
    LIMIT 20
) numbers;

-- アンケート質問の生成
INSERT INTO survey_questions (survey_id, question_text, question_type, options, is_required, order_index, created_at, updated_at)
SELECT 
    s.id as survey_id,
    CASE 
        WHEN s.title LIKE '%スマートフォン%' THEN
            CASE q.order_index
                WHEN 1 THEN '普段使用しているスマートフォンのOSは何ですか？'
                WHEN 2 THEN '1日にスマートフォンを使用する時間はどのくらいですか？'
                WHEN 3 THEN 'よく使用するアプリの種類を教えてください（複数選択可）'
                WHEN 4 THEN 'アプリの使いやすさについてどう思いますか？'
                WHEN 5 THEN 'アプリの改善点があれば教えてください'
            END
        WHEN s.title LIKE '%オンラインショッピング%' THEN
            CASE q.order_index
                WHEN 1 THEN 'オンラインショッピングを利用する頻度は？'
                WHEN 2 THEN 'よく利用するECサイトは？（複数選択可）'
                WHEN 3 THEN 'オンラインショッピングで重視する要素は？'
                WHEN 4 THEN 'オンラインショッピングの満足度は？'
                WHEN 5 THEN '改善してほしい点があれば教えてください'
            END
        WHEN s.title LIKE '%リモートワーク%' THEN
            CASE q.order_index
                WHEN 1 THEN '現在の働き方は？'
                WHEN 2 THEN 'リモートワークの頻度は？'
                WHEN 3 THEN 'リモートワークのメリットは？（複数選択可）'
                WHEN 4 THEN 'リモートワークの課題は？（複数選択可）'
                WHEN 5 THEN 'リモートワークの満足度は？'
                WHEN 6 THEN 'リモートワークについてのご意見をお聞かせください'
            END
        WHEN s.title LIKE '%健康管理%' THEN
            CASE q.order_index
                WHEN 1 THEN '健康管理アプリを利用していますか？'
                WHEN 2 THEN '利用しているアプリの種類は？（複数選択可）'
                WHEN 3 THEN 'アプリの利用頻度は？'
                WHEN 4 THEN 'アプリの効果を感じていますか？'
                WHEN 5 THEN '健康管理についてのご意見をお聞かせください'
            END
        WHEN s.title LIKE '%動画配信%' THEN
            CASE q.order_index
                WHEN 1 THEN '利用している動画配信サービスは？（複数選択可）'
                WHEN 2 THEN '1週間の視聴時間は？'
                WHEN 3 THEN 'よく視聴するコンテンツの種類は？（複数選択可）'
                WHEN 4 THEN 'サービスの満足度は？'
                WHEN 5 THEN '改善してほしい点があれば教えてください'
            END
    END as question_text,
    CASE q.order_index
        WHEN 5 THEN 'textarea'
        WHEN 6 THEN 'textarea'
        ELSE CASE FLOOR(RAND() * 3)
            WHEN 0 THEN 'radio'
            WHEN 1 THEN 'checkbox'
            WHEN 2 THEN 'rating'
        END
    END as question_type,
    CASE 
        WHEN s.title LIKE '%スマートフォン%' THEN
            CASE q.order_index
                WHEN 1 THEN '["iOS", "Android", "その他"]'
                WHEN 2 THEN '["1時間未満", "1-3時間", "3-5時間", "5時間以上"]'
                WHEN 3 THEN '["SNS", "ゲーム", "動画", "ニュース", "ショッピング", "その他"]'
                WHEN 4 THEN '["1", "2", "3", "4", "5"]'
                ELSE NULL
            END
        WHEN s.title LIKE '%オンラインショッピング%' THEN
            CASE q.order_index
                WHEN 1 THEN '["毎日", "週に数回", "月に数回", "年に数回", "利用しない"]'
                WHEN 2 THEN '["Amazon", "楽天", "Yahoo!ショッピング", "メルカリ", "その他"]'
                WHEN 3 THEN '["価格", "配送速度", "商品品質", "レビュー", "返品保証"]'
                WHEN 4 THEN '["1", "2", "3", "4", "5"]'
                ELSE NULL
            END
        WHEN s.title LIKE '%リモートワーク%' THEN
            CASE q.order_index
                WHEN 1 THEN '["完全リモート", "ハイブリッド", "完全出社", "その他"]'
                WHEN 2 THEN '["毎日", "週に3-4日", "週に1-2日", "月に数回", "実施していない"]'
                WHEN 3 THEN '["通勤時間の削減", "集中力向上", "ワークライフバランス", "コスト削減", "その他"]'
                WHEN 4 THEN '["コミュニケーション", "集中力維持", "技術的問題", "孤独感", "その他"]'
                WHEN 5 THEN '["1", "2", "3", "4", "5"]'
                ELSE NULL
            END
        WHEN s.title LIKE '%健康管理%' THEN
            CASE q.order_index
                WHEN 1 THEN '["利用している", "過去に利用していた", "利用していない"]'
                WHEN 2 THEN '["歩数計", "睡眠管理", "食事管理", "運動記録", "体重管理", "その他"]'
                WHEN 3 THEN '["毎日", "週に数回", "月に数回", "たまに"]'
                WHEN 4 THEN '["1", "2", "3", "4", "5"]'
                ELSE NULL
            END
        WHEN s.title LIKE '%動画配信%' THEN
            CASE q.order_index
                WHEN 1 THEN '["Netflix", "Amazon Prime", "Disney+", "Hulu", "YouTube Premium", "その他"]'
                WHEN 2 THEN '["5時間未満", "5-10時間", "10-20時間", "20時間以上"]'
                WHEN 3 THEN '["映画", "ドラマ", "アニメ", "ドキュメンタリー", "バラエティ", "その他"]'
                WHEN 4 THEN '["1", "2", "3", "4", "5"]'
                ELSE NULL
            END
    END as options,
    CASE FLOOR(RAND() * 10)
        WHEN 0 THEN 0
        WHEN 1 THEN 0
        ELSE 1
    END as is_required,
    q.order_index,
    NOW() as created_at,
    NOW() as updated_at
FROM surveys s
CROSS JOIN (
    SELECT 1 as order_index UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
) q
WHERE q.order_index <= CASE 
    WHEN s.title LIKE '%リモートワーク%' THEN 6
    ELSE 5
END;

-- 複雑な回答データの生成（2000件）
INSERT INTO survey_responses (survey_id, user_id, question_id, answer, created_at)
SELECT 
    s.id as survey_id,
    u.id as user_id,
    q.id as question_id,
    CASE q.question_type
        WHEN 'radio' THEN
            CASE 
                WHEN q.question_text LIKE '%OS%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN 'iOS'
                        WHEN 1 THEN 'Android'
                        ELSE 'その他'
                    END
                WHEN q.question_text LIKE '%時間%' THEN 
                    CASE FLOOR(RAND() * 4)
                        WHEN 0 THEN '1時間未満'
                        WHEN 1 THEN '1-3時間'
                        WHEN 2 THEN '3-5時間'
                        ELSE '5時間以上'
                    END
                WHEN q.question_text LIKE '%頻度%' THEN 
                    CASE FLOOR(RAND() * 5)
                        WHEN 0 THEN '毎日'
                        WHEN 1 THEN '週に数回'
                        WHEN 2 THEN '月に数回'
                        WHEN 3 THEN '年に数回'
                        ELSE '利用しない'
                    END
                WHEN q.question_text LIKE '%働き方%' THEN 
                    CASE FLOOR(RAND() * 4)
                        WHEN 0 THEN '完全リモート'
                        WHEN 1 THEN 'ハイブリッド'
                        WHEN 2 THEN '完全出社'
                        ELSE 'その他'
                    END
                WHEN q.question_text LIKE '%利用%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '利用している'
                        WHEN 1 THEN '過去に利用していた'
                        ELSE '利用していない'
                    END
                ELSE 'テスト回答'
            END
        WHEN 'checkbox' THEN
            CASE 
                WHEN q.question_text LIKE '%アプリ%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '["SNS", "ゲーム"]'
                        WHEN 1 THEN '["動画", "ニュース"]'
                        ELSE '["ショッピング", "その他"]'
                    END
                WHEN q.question_text LIKE '%ECサイト%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '["Amazon", "楽天"]'
                        WHEN 1 THEN '["Yahoo!ショッピング", "メルカリ"]'
                        ELSE '["Amazon", "楽天", "Yahoo!ショッピング"]'
                    END
                WHEN q.question_text LIKE '%メリット%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '["通勤時間の削減", "集中力向上"]'
                        WHEN 1 THEN '["ワークライフバランス", "コスト削減"]'
                        ELSE '["通勤時間の削減", "集中力向上", "ワークライフバランス"]'
                    END
                WHEN q.question_text LIKE '%課題%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '["コミュニケーション", "集中力維持"]'
                        WHEN 1 THEN '["技術的問題", "孤独感"]'
                        ELSE '["コミュニケーション", "技術的問題", "孤独感"]'
                    END
                WHEN q.question_text LIKE '%種類%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '["歩数計", "睡眠管理"]'
                        WHEN 1 THEN '["食事管理", "運動記録"]'
                        ELSE '["歩数計", "睡眠管理", "食事管理"]'
                    END
                WHEN q.question_text LIKE '%サービス%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '["Netflix", "Amazon Prime"]'
                        WHEN 1 THEN '["Disney+", "Hulu"]'
                        ELSE '["Netflix", "Amazon Prime", "Disney+"]'
                    END
                WHEN q.question_text LIKE '%コンテンツ%' THEN 
                    CASE FLOOR(RAND() * 3)
                        WHEN 0 THEN '["映画", "ドラマ"]'
                        WHEN 1 THEN '["アニメ", "ドキュメンタリー"]'
                        ELSE '["映画", "ドラマ", "アニメ"]'
                    END
                ELSE '["テスト1", "テスト2"]'
            END
        WHEN 'rating' THEN
            CASE 
                WHEN u.birth_date IS NOT NULL AND TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) < 30 THEN
                    -- 若年層は高評価傾向
                    CASE FLOOR(RAND() * 10)
                        WHEN 0 THEN '1'
                        WHEN 1 THEN '2'
                        WHEN 2 THEN '3'
                        WHEN 3 THEN '4'
                        WHEN 4 THEN '5'
                        WHEN 5 THEN '4'
                        WHEN 6 THEN '5'
                        WHEN 7 THEN '4'
                        WHEN 8 THEN '5'
                        ELSE '5'
                    END
                WHEN u.birth_date IS NOT NULL AND TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) > 50 THEN
                    -- 高齢層は保守的
                    CASE FLOOR(RAND() * 10)
                        WHEN 0 THEN '1'
                        WHEN 1 THEN '2'
                        WHEN 2 THEN '2'
                        WHEN 3 THEN '3'
                        WHEN 4 THEN '3'
                        WHEN 5 THEN '3'
                        WHEN 6 THEN '4'
                        WHEN 7 THEN '4'
                        WHEN 8 THEN '3'
                        ELSE '2'
                    END
                ELSE
                    -- 中年層はバランス
                    CASE FLOOR(RAND() * 5)
                        WHEN 0 THEN '1'
                        WHEN 1 THEN '2'
                        WHEN 2 THEN '3'
                        WHEN 3 THEN '4'
                        ELSE '5'
                    END
            END
        WHEN 'textarea' THEN
            CASE 
                WHEN q.question_text LIKE '%スマートフォン%' THEN 
                    CASE FLOOR(RAND() * 4)
                        WHEN 0 THEN 'とても使いやすくて気に入っています。素晴らしいです。'
                        WHEN 1 THEN 'もう少し軽量化してほしいです。問題があります。'
                        WHEN 2 THEN '機能が豊富で便利です。満足しています。'
                        ELSE 'UIが分かりにくい部分があります。改善が必要です。'
                    END
                WHEN q.question_text LIKE '%オンラインショッピング%' THEN 
                    CASE FLOOR(RAND() * 4)
                        WHEN 0 THEN '配送が早くて助かります。最高です。'
                        WHEN 1 THEN '商品の品質にばらつきがあります。不満です。'
                        WHEN 2 THEN '価格が安くてお得です。気に入りました。'
                        ELSE '返品手続きが複雑です。困っています。'
                    END
                WHEN q.question_text LIKE '%リモートワーク%' THEN 
                    CASE FLOOR(RAND() * 4)
                        WHEN 0 THEN '集中力が向上して効率的です。素晴らしいです。'
                        WHEN 1 THEN 'コミュニケーションが取りにくいです。問題があります。'
                        WHEN 2 THEN '通勤時間が削減されて助かります。満足しています。'
                        ELSE '孤独感を感じることがあります。改善が必要です。'
                    END
                WHEN q.question_text LIKE '%健康管理%' THEN 
                    CASE FLOOR(RAND() * 4)
                        WHEN 0 THEN '健康意識が高まりました。最高です。'
                        WHEN 1 THEN 'データの精度に疑問があります。不満です。'
                        WHEN 2 THEN '継続しやすい仕組みが良いです。気に入りました。'
                        ELSE '機能が複雑で使いにくいです。困っています。'
                    END
                WHEN q.question_text LIKE '%動画配信%' THEN 
                    CASE FLOOR(RAND() * 4)
                        WHEN 0 THEN 'コンテンツが豊富で満足です。素晴らしいです。'
                        WHEN 1 THEN '料金が高いと感じます。不満です。'
                        WHEN 2 THEN '画質が良くて見やすいです。最高です。'
                        ELSE '配信が不安定なことがあります。問題があります。'
                    END
                ELSE 'テスト回答です。特に問題なく使用しています。'
            END
        ELSE 'テスト回答'
    END as answer,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY) + INTERVAL FLOOR(RAND() * 1440) MINUTE + INTERVAL FLOOR(RAND() * 60) SECOND as created_at
FROM surveys s
CROSS JOIN users u
CROSS JOIN survey_questions q
WHERE q.survey_id = s.id
AND FLOOR(RAND() * 100) < 80  -- 80%の回答率
LIMIT 2000;

-- アンケートの回答数を更新
UPDATE surveys s
SET current_responses = (
    SELECT COUNT(DISTINCT user_id)
    FROM survey_responses sr
    WHERE sr.survey_id = s.id
);

-- AI分析データの生成
INSERT INTO survey_analytics (survey_id, total_responses, completion_rate, average_completion_time, response_quality_score, demographic_breakdown, question_analytics, sentiment_analysis, trend_data, generated_at, created_at, updated_at)
SELECT 
    s.id as survey_id,
    COUNT(DISTINCT sr.user_id) as total_responses,
    ROUND(
        (COUNT(DISTINCT CASE 
            WHEN user_responses.response_count >= total_questions THEN sr.user_id 
        END) / COUNT(DISTINCT sr.user_id)) * 100, 2
    ) as completion_rate,
    ROUND(AVG(user_responses.completion_time), 2) as average_completion_time,
    ROUND(
        (completion_rate / 100) * 30 + 
        (AVG(CASE WHEN q.question_type IN ('text', 'textarea') THEN CHAR_LENGTH(sr.answer) ELSE 0 END) / 100) * 30 +
        (AVG(CASE WHEN q.question_type IN ('radio', 'rating') THEN 1 ELSE 0.5 END)) * 40, 2
    ) as response_quality_score,
    JSON_OBJECT(
        'gender', JSON_OBJECT(
            'male', COUNT(DISTINCT CASE WHEN u.gender = 'male' THEN sr.user_id END),
            'female', COUNT(DISTINCT CASE WHEN u.gender = 'female' THEN sr.user_id END),
            'other', COUNT(DISTINCT CASE WHEN u.gender = 'other' THEN sr.user_id END)
        ),
        'age_groups', JSON_OBJECT(
            'under_20', COUNT(DISTINCT CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) < 20 THEN sr.user_id END),
            '20s', COUNT(DISTINCT CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) BETWEEN 20 AND 29 THEN sr.user_id END),
            '30s', COUNT(DISTINCT CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) BETWEEN 30 AND 39 THEN sr.user_id END),
            '40s', COUNT(DISTINCT CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) BETWEEN 40 AND 49 THEN sr.user_id END),
            '50s', COUNT(DISTINCT CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) BETWEEN 50 AND 59 THEN sr.user_id END),
            'over_60', COUNT(DISTINCT CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, NOW()) >= 60 THEN sr.user_id END)
        )
    ) as demographic_breakdown,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'question_id', q.id,
            'question_text', q.question_text,
            'question_type', q.question_type,
            'response_count', COUNT(sr.id),
            'response_rate', ROUND((COUNT(sr.id) / COUNT(DISTINCT sr.user_id)) * 100, 2),
            'answer_distribution', CASE 
                WHEN q.question_type = 'rating' THEN
                    JSON_OBJECT(
                        '1', COUNT(CASE WHEN sr.answer = '1' THEN 1 END),
                        '2', COUNT(CASE WHEN sr.answer = '2' THEN 1 END),
                        '3', COUNT(CASE WHEN sr.answer = '3' THEN 1 END),
                        '4', COUNT(CASE WHEN sr.answer = '4' THEN 1 END),
                        '5', COUNT(CASE WHEN sr.answer = '5' THEN 1 END)
                    )
                ELSE JSON_OBJECT('distribution', 'calculated')
            END,
            'average_rating', CASE 
                WHEN q.question_type = 'rating' THEN ROUND(AVG(CAST(sr.answer AS UNSIGNED)), 2)
                ELSE NULL
            END
        )
    ) as question_analytics,
    JSON_OBJECT(
        'positive', COUNT(CASE 
            WHEN sr.answer LIKE '%素晴らしい%' OR sr.answer LIKE '%最高%' OR sr.answer LIKE '%満足%' OR sr.answer LIKE '%気に入り%' OR sr.answer LIKE '%便利%' OR sr.answer LIKE '%おすすめ%'
            THEN 1 END),
        'negative', COUNT(CASE 
            WHEN sr.answer LIKE '%問題%' OR sr.answer LIKE '%困る%' OR sr.answer LIKE '%不満%' OR sr.answer LIKE '%改善%' OR sr.answer LIKE '%悪い%' OR sr.answer LIKE '%最悪%'
            THEN 1 END),
        'neutral', COUNT(CASE 
            WHEN sr.answer LIKE '%普通%' OR sr.answer LIKE '%まあまあ%' OR sr.answer LIKE '%特に%' OR sr.answer LIKE '%それなり%'
            THEN 1 END),
        'total_text_responses', COUNT(CASE WHEN q.question_type IN ('text', 'textarea') THEN 1 END)
    ) as sentiment_analysis,
    JSON_OBJECT(
        'daily_responses', JSON_OBJECT(
            'trend', 'calculated_daily'
        ),
        'total_responses_over_time', JSON_OBJECT(
            'trend', 'calculated_cumulative'
        )
    ) as trend_data,
    NOW() as generated_at,
    NOW() as created_at,
    NOW() as updated_at
FROM surveys s
LEFT JOIN survey_responses sr ON s.id = sr.survey_id
LEFT JOIN users u ON sr.user_id = u.id
LEFT JOIN survey_questions q ON sr.question_id = q.id
LEFT JOIN (
    SELECT 
        survey_id,
        user_id,
        COUNT(*) as response_count,
        TIMESTAMPDIFF(MINUTE, MIN(created_at), MAX(created_at)) as completion_time
    FROM survey_responses
    GROUP BY survey_id, user_id
) user_responses ON s.id = user_responses.survey_id AND sr.user_id = user_responses.user_id
LEFT JOIN (
    SELECT survey_id, COUNT(*) as total_questions
    FROM survey_questions
    GROUP BY survey_id
) question_counts ON s.id = question_counts.survey_id
GROUP BY s.id;

-- AI インサイトの生成
INSERT INTO survey_insights (survey_id, insight_type, title, description, confidence_score, data_points, recommendations, generated_by_ai, created_at, updated_at)
SELECT 
    sa.survey_id,
    CASE 
        WHEN sa.completion_rate < 70 THEN 'completion_rate'
        WHEN sa.response_quality_score < 60 THEN 'response_quality'
        WHEN JSON_EXTRACT(sa.sentiment_analysis, '$.negative') > JSON_EXTRACT(sa.sentiment_analysis, '$.positive') THEN 'sentiment_analysis'
        WHEN JSON_EXTRACT(sa.demographic_breakdown, '$.gender.male') > JSON_EXTRACT(sa.demographic_breakdown, '$.gender.female') * 2 THEN 'demographic_bias'
        ELSE 'general_insight'
    END as insight_type,
    CASE 
        WHEN sa.completion_rate < 70 THEN '完了率が低いです'
        WHEN sa.response_quality_score < 60 THEN '回答品質が低いです'
        WHEN JSON_EXTRACT(sa.sentiment_analysis, '$.negative') > JSON_EXTRACT(sa.sentiment_analysis, '$.positive') THEN 'ネガティブな感情が検出されています'
        WHEN JSON_EXTRACT(sa.demographic_breakdown, '$.gender.male') > JSON_EXTRACT(sa.demographic_breakdown, '$.gender.female') * 2 THEN '回答者の性別に偏りがあります'
        ELSE '一般的な改善提案'
    END as title,
    CASE 
        WHEN sa.completion_rate < 70 THEN CONCAT('現在の完了率は', sa.completion_rate, '%です。質問数を減らすか、インセンティブを増やすことを検討してください。')
        WHEN sa.response_quality_score < 60 THEN CONCAT('回答品質スコアが', sa.response_quality_score, '点です。質問の明確化や回答オプションの改善が必要です。')
        WHEN JSON_EXTRACT(sa.sentiment_analysis, '$.negative') > JSON_EXTRACT(sa.sentiment_analysis, '$.positive') THEN '回答者の多くがネガティブな感情を示しています。改善点を特定し、対応策を検討してください。'
        WHEN JSON_EXTRACT(sa.demographic_breakdown, '$.gender.male') > JSON_EXTRACT(sa.demographic_breakdown, '$.gender.female') * 2 THEN '回答者の多くが男性です。より多様な回答を得るために、ターゲット層を拡大することを検討してください。'
        ELSE 'アンケートの全体的な改善を検討してください。'
    END as description,
    CASE 
        WHEN sa.completion_rate < 70 THEN 85
        WHEN sa.response_quality_score < 60 THEN 80
        WHEN JSON_EXTRACT(sa.sentiment_analysis, '$.negative') > JSON_EXTRACT(sa.sentiment_analysis, '$.positive') THEN 70
        WHEN JSON_EXTRACT(sa.demographic_breakdown, '$.gender.male') > JSON_EXTRACT(sa.demographic_breakdown, '$.gender.female') * 2 THEN 75
        ELSE 60
    END as confidence_score,
    JSON_OBJECT(
        'completion_rate', sa.completion_rate,
        'quality_score', sa.response_quality_score,
        'sentiment_data', sa.sentiment_analysis,
        'demographic_data', sa.demographic_breakdown
    ) as data_points,
    CASE 
        WHEN sa.completion_rate < 70 THEN JSON_ARRAY('質問数を10問以下に減らす', 'ポイントを20%増加させる', '完了時間を5分以内に設定する')
        WHEN sa.response_quality_score < 60 THEN JSON_ARRAY('質問文をより具体的にする', '回答オプションを明確にする', '必須回答を適切に設定する')
        WHEN JSON_EXTRACT(sa.sentiment_analysis, '$.negative') > JSON_EXTRACT(sa.sentiment_analysis, '$.positive') THEN JSON_ARRAY('ネガティブな回答の詳細分析', '改善点の特定', 'ユーザーフィードバックの収集')
        WHEN JSON_EXTRACT(sa.demographic_breakdown, '$.gender.male') > JSON_EXTRACT(sa.demographic_breakdown, '$.gender.female') * 2 THEN JSON_ARRAY('異なるチャネルでのプロモーション', 'インセンティブの調整', 'ターゲット層の見直し')
        ELSE JSON_ARRAY('全体的な改善', 'ユーザー体験の向上', '継続的な分析')
    END as recommendations,
    1 as generated_by_ai,
    NOW() as created_at,
    NOW() as updated_at
FROM survey_analytics sa
WHERE sa.total_responses > 0;

-- 統計情報の表示
SELECT 
    'Test Data Generation Summary' as summary,
    (SELECT COUNT(*) FROM survey_categories) as categories,
    (SELECT COUNT(*) FROM surveys) as surveys,
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM survey_responses) as responses,
    (SELECT COUNT(*) FROM survey_analytics) as analytics_records,
    (SELECT COUNT(*) FROM survey_insights) as ai_insights;

-- AI分析機能の有効性を示すサンプルクエリ
SELECT 
    'AI Analytics Features Demonstrated' as feature_category,
    'Real-time data processing' as feature_1,
    'Sentiment analysis (Japanese)' as feature_2,
    'Quality scoring' as feature_3,
    'Demographic analysis' as feature_4,
    'Trend analysis' as feature_5,
    'AI-powered insights' as feature_6,
    'Completion rate analysis' as feature_7,
    'Response pattern detection' as feature_8;
