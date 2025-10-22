-- Survey Monitor Site Database Schema
-- MySQL Database Design for Modern Survey Monitor Platform

-- Users table (拡張されたユーザー情報)
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    birth_date DATE NULL,
    gender ENUM('male', 'female', 'other', 'prefer_not_to_say') NULL,
    prefecture VARCHAR(50) NULL,
    city VARCHAR(100) NULL,
    occupation VARCHAR(100) NULL,
    annual_income ENUM('under_3m', '3m_5m', '5m_7m', '7m_10m', '10m_15m', '15m_20m', 'over_20m', 'prefer_not_to_say') NULL,
    family_structure ENUM('single', 'couple', 'family_with_children', 'extended_family', 'other') NULL,
    interests TEXT NULL, -- JSON形式で趣味・興味を保存
    profile_image VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    points INT DEFAULT 0, -- 獲得ポイント
    total_earnings DECIMAL(10,2) DEFAULT 0.00, -- 総収益
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_prefecture (prefecture),
    INDEX idx_gender (gender),
    INDEX idx_age (birth_date),
    INDEX idx_active (is_active)
);

-- Survey categories
CREATE TABLE survey_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    icon VARCHAR(50) NULL,
    color VARCHAR(7) NULL, -- HEX color code
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Surveys table
CREATE TABLE surveys (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    category_id BIGINT UNSIGNED NULL,
    client_name VARCHAR(255) NULL, -- 依頼企業名
    target_gender ENUM('all', 'male', 'female', 'other') DEFAULT 'all',
    target_age_min INT NULL,
    target_age_max INT NULL,
    target_prefectures JSON NULL, -- 対象都道府県
    target_occupations JSON NULL, -- 対象職業
    target_income_ranges JSON NULL, -- 対象年収
    target_family_structures JSON NULL, -- 対象家族構成
    required_points INT DEFAULT 0, -- 必要ポイント
    reward_points INT DEFAULT 0, -- 報酬ポイント
    reward_amount DECIMAL(8,2) DEFAULT 0.00, -- 報酬金額
    estimated_time INT DEFAULT 0, -- 推定所要時間（分）
    max_responses INT DEFAULT 0, -- 最大回答数
    current_responses INT DEFAULT 0, -- 現在の回答数
    start_date DATETIME NULL,
    end_date DATETIME NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE, -- おすすめアンケート
    priority INT DEFAULT 0, -- 表示優先度
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES survey_categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_targets (target_gender, target_age_min, target_age_max)
);

-- Survey questions
CREATE TABLE survey_questions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    survey_id BIGINT UNSIGNED NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('single_choice', 'multiple_choice', 'text', 'rating', 'date', 'number', 'file_upload') NOT NULL,
    options JSON NULL, -- 選択肢（JSON形式）
    is_required BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    validation_rules JSON NULL, -- バリデーションルール
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE,
    INDEX idx_survey (survey_id),
    INDEX idx_order (sort_order)
);

-- User survey responses
CREATE TABLE survey_responses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    survey_id BIGINT UNSIGNED NOT NULL,
    status ENUM('in_progress', 'completed', 'abandoned') DEFAULT 'in_progress',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    total_time_spent INT DEFAULT 0, -- 所要時間（秒）
    points_earned INT DEFAULT 0,
    amount_earned DECIMAL(8,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_survey (user_id, survey_id),
    INDEX idx_user (user_id),
    INDEX idx_survey (survey_id),
    INDEX idx_status (status)
);

-- Individual question answers
CREATE TABLE survey_answers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    response_id BIGINT UNSIGNED NOT NULL,
    question_id BIGINT UNSIGNED NOT NULL,
    answer_text TEXT NULL,
    answer_value JSON NULL, -- 複数選択や数値データ用
    file_path VARCHAR(255) NULL, -- ファイルアップロード用
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (response_id) REFERENCES survey_responses(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES survey_questions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_response_question (response_id, question_id),
    INDEX idx_response (response_id),
    INDEX idx_question (question_id)
);

-- User points history
CREATE TABLE user_points_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    points INT NOT NULL,
    type ENUM('earned', 'spent', 'bonus', 'penalty') NOT NULL,
    description VARCHAR(255) NULL,
    survey_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_created (created_at)
);

-- User earnings history
CREATE TABLE user_earnings_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(8,2) NOT NULL,
    type ENUM('survey_reward', 'bonus', 'referral', 'withdrawal') NOT NULL,
    description VARCHAR(255) NULL,
    survey_id BIGINT UNSIGNED NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_status (status)
);

-- Notifications
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL, -- NULLの場合は全ユーザー向け
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error', 'survey_invitation') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255) NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_type (type),
    INDEX idx_expires (expires_at)
);

-- Site settings
CREATE TABLE site_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NULL,
    description VARCHAR(255) NULL,
    type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default survey categories
INSERT INTO survey_categories (name, description, icon, color, sort_order) VALUES
('ライフスタイル', '日常生活やライフスタイルに関するアンケート', 'home', '#3B82F6', 1),
('商品・サービス', '商品やサービスの評価に関するアンケート', 'shopping-cart', '#10B981', 2),
('テクノロジー', 'IT・テクノロジー関連のアンケート', 'laptop', '#8B5CF6', 3),
('エンターテイメント', '映画、音楽、ゲームなどのエンターテイメント', 'music', '#F59E0B', 4),
('健康・美容', '健康、美容、医療に関するアンケート', 'heart', '#EF4444', 5),
('教育・学習', '教育、学習、スキルアップに関するアンケート', 'book', '#06B6D4', 6),
('旅行・レジャー', '旅行、レジャー、観光に関するアンケート', 'map', '#84CC16', 7),
('その他', 'その他のカテゴリ', 'more-horizontal', '#6B7280', 8);

-- Insert default site settings
INSERT INTO site_settings (key, value, description, type) VALUES
('site_name', 'Survey Monitor', 'サイト名', 'string'),
('site_description', '現代的で魅力的なアンケートモニターサイト', 'サイト説明', 'string'),
('points_per_yen', '1', '1円あたりのポイント数', 'number'),
('min_withdrawal_amount', '1000', '最小出金額', 'number'),
('max_withdrawal_amount', '100000', '最大出金額', 'number'),
('referral_bonus_points', '500', '紹介ボーナスポイント', 'number'),
('welcome_bonus_points', '1000', '新規登録ボーナスポイント', 'number');

