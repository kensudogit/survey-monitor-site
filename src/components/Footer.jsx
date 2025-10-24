import React from 'react';

/**
 * フッターコンポーネント
 * 
 * サイトの最下部に表示されるフッター
 * サービス情報、アカウント情報、サポート情報を提供
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報セクション */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Survey Monitor</h4>
            <p className="text-gray-400">
              アンケートに参加してポイントを獲得し、あなたの意見を価値に変えましょう。
            </p>
          </div>
          
          {/* サービスメニューセクション */}
          <div>
            <h4 className="text-lg font-semibold mb-4">サービス</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/surveys" className="hover:text-white">アンケート一覧</a></li>
              <li><a href="/dashboard" className="hover:text-white">ダッシュボード</a></li>
              <li><a href="#" className="hover:text-white">ポイント交換</a></li>
            </ul>
          </div>
          
          {/* アカウントメニューセクション */}
          <div>
            <h4 className="text-lg font-semibold mb-4">アカウント</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/login" className="hover:text-white">ログイン</a></li>
              <li><a href="/register" className="hover:text-white">新規登録</a></li>
              <li><a href="#" className="hover:text-white">プロフィール</a></li>
            </ul>
          </div>
          
          {/* サポートメニューセクション */}
          <div>
            <h4 className="text-lg font-semibold mb-4">サポート</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">ヘルプセンター</a></li>
              <li><a href="#" className="hover:text-white">お問い合わせ</a></li>
              <li><a href="#" className="hover:text-white">利用規約</a></li>
            </ul>
          </div>
        </div>
        
        {/* コピーライトセクション */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Survey Monitor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
