// 実用的な認証・セッション管理システム
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // ローカルストレージからユーザー情報を復元
        const savedUser = localStorage.getItem('survey_monitor_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    // ユーザー登録
    async register(userData) {
        try {
            // バリデーション
            if (!this.validateUserData(userData)) {
                throw new Error('入力データが無効です');
            }

            // 既存ユーザーチェック
            const existingUsers = this.getUsers();
            if (existingUsers.find(u => u.email === userData.email)) {
                throw new Error('このメールアドレスは既に登録されています');
            }

            // 新規ユーザー作成
            const newUser = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                password: this.hashPassword(userData.password),
                age: userData.age,
                gender: userData.gender,
                points: 0,
                surveysCompleted: [],
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            // ユーザーを保存
            existingUsers.push(newUser);
            localStorage.setItem('survey_monitor_users', JSON.stringify(existingUsers));

            // ログイン状態に設定
            this.currentUser = newUser;
            localStorage.setItem('survey_monitor_user', JSON.stringify(newUser));

            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * ユーザーログイン処理
     * @param {string} email - メールアドレス
     * @param {string} password - パスワード
     * @returns {Object} ログイン結果
     */
    async login(email, password) {
        try {
            const users = this.getUsers();
            const user = users.find(u => u.email === email && u.password === this.hashPassword(password));
            
            if (!user) {
                throw new Error('メールアドレスまたはパスワードが正しくありません');
            }

            // ログイン情報更新
            user.lastLogin = new Date().toISOString();
            this.updateUser(user);

            // セッション設定
            this.currentUser = user;
            localStorage.setItem('survey_monitor_user', JSON.stringify(user));

            return { success: true, user: user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * ユーザーログアウト処理
     */
    logout() {
        console.log('Logging out user:', this.currentUser?.name);
        this.currentUser = null;
        localStorage.removeItem('survey_monitor_user');
        this.updateUI();
        
        // ログアウト後のリダイレクト処理
        setTimeout(() => {
            window.location.href = '/';
        }, 100);
    }

    /**
     * ユーザーデータのバリデーション
     * @param {Object} userData - ユーザーデータ
     * @returns {boolean} バリデーション結果
     */
    validateUserData(userData) {
        if (!userData.name || userData.name.length < 2) return false;
        if (!userData.email || !this.isValidEmail(userData.email)) return false;
        if (!userData.password || userData.password.length < 8) return false;
        if (!userData.age || !userData.gender) return false;
        return true;
    }

    /**
     * メールアドレスの妥当性チェック
     * @param {string} email - メールアドレス
     * @returns {boolean} 妥当性結果
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * パスワードのハッシュ化（簡易版）
     * @param {string} password - パスワード
     * @returns {string} ハッシュ化されたパスワード
     */
    hashPassword(password) {
        return btoa(password + 'survey_monitor_salt');
    }

    /**
     * ユーザー一覧の取得
     * @returns {Array} ユーザー配列
     */
    getUsers() {
        const users = localStorage.getItem('survey_monitor_users');
        return users ? JSON.parse(users) : [];
    }

    /**
     * ユーザー情報の更新
     * @param {Object} user - 更新するユーザー情報
     */
    updateUser(user) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('survey_monitor_users', JSON.stringify(users));
        }
    }

    /**
     * ポイント追加処理
     * @param {number} points - 追加するポイント数
     */
    addPoints(points) {
        if (this.currentUser) {
            this.currentUser.points += points;
            this.updateUser(this.currentUser);
            localStorage.setItem('survey_monitor_user', JSON.stringify(this.currentUser));
            this.updateUI();
        }
    }

    /**
     * アンケート完了記録
     * @param {string} surveyId - アンケートID
     */
    completeSurvey(surveyId) {
        if (this.currentUser) {
            if (!this.currentUser.surveysCompleted.includes(surveyId)) {
                this.currentUser.surveysCompleted.push(surveyId);
                this.updateUser(this.currentUser);
                localStorage.setItem('survey_monitor_user', JSON.stringify(this.currentUser));
            }
        }
    }

    /**
     * UI更新処理
     * 認証状態に応じてUI要素の表示を切り替える
     */
    updateUI() {
        const loginLinks = document.querySelectorAll('.login-link');
        const userInfo = document.querySelectorAll('.user-info');
        const logoutBtn = document.querySelectorAll('.logout-btn');

        if (this.currentUser) {
            // ログイン済み状態
            loginLinks.forEach(link => link.style.display = 'none');
            userInfo.forEach(info => {
                info.style.display = 'block';
                info.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-user-circle text-white"></i>
                        <span class="text-white">${this.currentUser.name}</span>
                        <span class="text-blue-200">(${this.currentUser.points}pt)</span>
                    </div>
                `;
            });
            logoutBtn.forEach(btn => btn.style.display = 'block');
        } else {
            // 未ログイン状態
            loginLinks.forEach(link => link.style.display = 'block');
            userInfo.forEach(info => info.style.display = 'none');
            logoutBtn.forEach(btn => btn.style.display = 'none');
        }
    }

    /**
     * デモユーザーでログイン処理
     * @returns {Object} ログイン結果
     */
    loginDemo() {
        const demoUser = {
            id: 'demo_user',
            name: 'デモユーザー',
            email: 'demo@example.com',
            password: this.hashPassword('demo123'),
            age: '25-34',
            gender: 'その他',
            points: 150,
            surveysCompleted: ['survey_1', 'survey_2'],
            joinDate: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        // デモユーザーを保存
        const users = this.getUsers();
        const existingDemoIndex = users.findIndex(u => u.id === 'demo_user');
        if (existingDemoIndex !== -1) {
            users[existingDemoIndex] = demoUser;
        } else {
            users.push(demoUser);
        }
        localStorage.setItem('survey_monitor_users', JSON.stringify(users));

        // ログイン状態に設定
        this.currentUser = demoUser;
        localStorage.setItem('survey_monitor_user', JSON.stringify(demoUser));
        this.updateUI();

        return { success: true, user: demoUser };
    }

    /**
     * 認証チェック処理
     * 認証が必要なページでログイン状態を確認
     * @returns {boolean} 認証状態
     */
    requireAuth() {
        if (!this.currentUser) {
            alert('ログインが必要です');
            window.location.href = '/login.html';
            return false;
        }
        return true;
    }

    /**
     * 認証トークンの取得
     * @returns {string|null} 認証トークン
     */
    getToken() {
        return localStorage.getItem('auth_token');
    }

    /**
     * 認証トークンの設定
     * @param {string} token - 認証トークン
     */
    setToken(token) {
        localStorage.setItem('auth_token', token);
    }

    /**
     * 認証状態の確認
     * @returns {boolean} 認証状態
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// グローバル認証マネージャー
window.authManager = new AuthManager();
