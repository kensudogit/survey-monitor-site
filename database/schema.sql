-- Survey Monitor Database Schema
CREATE DATABASE IF NOT EXISTS survey_monitor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE survey_monitor;

-- Users table
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    birth_date DATE NULL,
    gender ENUM('male', 'female', 'other') NULL,
    points INT DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Survey categories table
CREATE TABLE survey_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Surveys table
CREATE TABLE surveys (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    points INT NOT NULL DEFAULT 0,
    duration_minutes INT NOT NULL DEFAULT 5,
    max_responses INT NULL,
    current_responses INT DEFAULT 0,
    status ENUM('draft', 'active', 'paused', 'completed') DEFAULT 'draft',
    start_date DATETIME NULL,
    end_date DATETIME NULL,
    image_url VARCHAR(500) NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES survey_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Survey questions table
CREATE TABLE survey_questions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    survey_id BIGINT UNSIGNED NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('text', 'textarea', 'radio', 'checkbox', 'select', 'rating', 'date') NOT NULL,
    options JSON NULL,
    is_required BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
);

-- Survey responses table
CREATE TABLE survey_responses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    survey_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    question_id BIGINT UNSIGNED NOT NULL,
    answer TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES survey_questions(id) ON DELETE CASCADE
);

-- Points transactions table
CREATE TABLE points_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    survey_id BIGINT UNSIGNED NULL,
    points INT NOT NULL,
    transaction_type ENUM('earned', 'spent', 'bonus', 'penalty') NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE SET NULL
);

-- Earnings table
CREATE TABLE earnings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'JPY',
    payment_method ENUM('bank_transfer', 'paypal', 'gift_card') NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    transaction_id VARCHAR(255) NULL,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Notifications table
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Site settings table
CREATE TABLE site_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO survey_categories (name, description, color, icon) VALUES
('テクノロジー', 'IT・テクノロジー関連のアンケート', '#3B82F6', 'fas fa-laptop-code'),
('ショッピング', '買い物・ECサイト関連のアンケート', '#10B981', 'fas fa-shopping-cart'),
('ビジネス', 'ビジネス・働き方関連のアンケート', '#8B5CF6', 'fas fa-briefcase'),
('ライフスタイル', '生活・ライフスタイル関連のアンケート', '#EC4899', 'fas fa-heart'),
('エンターテイメント', 'エンターテイメント・娯楽関連のアンケート', '#F59E0B', 'fas fa-gamepad'),
('ヘルスケア', '健康・医療関連のアンケート', '#EF4444', 'fas fa-heartbeat');

INSERT INTO site_settings (key_name, value, description) VALUES
('site_name', 'Survey Monitor', 'サイト名'),
('site_description', 'あなたの意見が価値に変わります', 'サイト説明'),
('points_per_yen', '1', '1円あたりのポイント数'),
('min_withdrawal', '1000', '最小出金額（円）'),
('max_surveys_per_day', '10', '1日の最大アンケート回答数');
