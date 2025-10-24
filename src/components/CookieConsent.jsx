import React, { useState, useEffect } from 'react';

/**
 * クッキー同意バナーコンポーネント
 * 
 * GDPR準拠のクッキー同意管理を行うコンポーネント
 * プライバシー保護を重視した分析機能とローカルストレージベースの認証を提供
 */
const CookieConsent = () => {
  // バナー表示状態と同意状況の管理
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // ローカルストレージから同意状況を確認
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      setConsentGiven(consent === 'accepted');
    }
  }, []);

  /**
   * クッキー同意処理
   * ユーザーが分析データ収集に同意した場合の処理
   */
  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsentGiven(true);
    setShowBanner(false);
    
    // サードパーティクッキーの代替手段を有効化
    enableAnalytics();
  };

  /**
   * クッキー拒否処理
   * ユーザーが分析データ収集を拒否した場合の処理
   */
  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setConsentGiven(false);
    setShowBanner(false);
    
    // サードパーティクッキーを無効化
    disableAnalytics();
  };

  /**
   * 分析機能の有効化
   * プライバシー保護を重視した分析機能を有効にする
   */
  const enableAnalytics = () => {
    // Google Analytics 4 の代替手段
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }

    // プライバシー重視の分析（サーバーサイド）
    fetch('/api/analytics/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consent: true,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        // 個人を特定できない情報のみ
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
    });
  };

  /**
   * 分析機能の無効化
   * サードパーティ分析を無効にし、プライバシー重視の分析のみ使用
   */
  const disableAnalytics = () => {
    // Google Analytics を無効化
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    // ローカルストレージベースの分析のみ使用
    console.log('Analytics disabled - using privacy-first approach');
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner" role="banner" aria-live="polite">
      <div className="cookie-consent">
        <div className="cookie-text">
          <p>
            <strong>プライバシー保護について</strong><br />
            当サイトでは、サードパーティクッキーを使用せず、プライバシーを重視した分析を行います。
            データは匿名化され、個人を特定できない形で収集されます。
          </p>
        </div>
        <div className="cookie-buttons">
          <button
            onClick={handleAccept}
            className="cookie-accept"
            aria-label="分析データの収集に同意する"
          >
            同意する
          </button>
          <button
            onClick={handleDecline}
            className="cookie-decline"
            aria-label="分析データの収集を拒否する"
          >
            拒否する
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * プライバシー重視の分析フック
 * 
 * サードパーティクッキーを使用せず、ローカルストレージベースで
 * プライバシーを保護しながら分析データを収集するカスタムフック
 */
export const usePrivacyAnalytics = () => {
  const trackEvent = (eventName, parameters = {}) => {
    // ローカルストレージベースの分析
    const analytics = JSON.parse(localStorage.getItem('privacy-analytics') || '{}');
    
    const event = {
      name: eventName,
      parameters: {
        ...parameters,
        timestamp: new Date().toISOString(),
        // 個人を特定できない情報のみ
        sessionId: generateSessionId(),
        page: window.location.pathname,
        referrer: document.referrer || 'direct'
      }
    };

    analytics[eventName] = analytics[eventName] || [];
    analytics[eventName].push(event);

    // 最新100件のみ保持
    if (analytics[eventName].length > 100) {
      analytics[eventName] = analytics[eventName].slice(-100);
    }

    localStorage.setItem('privacy-analytics', JSON.stringify(analytics));

    // サーバーに匿名データを送信（オプション）
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      sendAnonymousAnalytics(event);
    }
  };

  const sendAnonymousAnalytics = async (event) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          // 個人を特定できない情報のみ
          userAgent: navigator.userAgent,
          screenResolution: `${screen.width}x${screen.height}`,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      });
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }
  };

  const generateSessionId = () => {
    let sessionId = localStorage.getItem('session-id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session-id', sessionId);
    }
    return sessionId;
  };

  return { trackEvent };
};

/**
 * ローカルストレージの代替手段フック
 * 
 * ローカルストレージが利用できない場合の代替手段を提供するカスタムフック
 * エラーハンドリングとメモリベースの代替手段を含む
 */
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('LocalStorage not available:', error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn('LocalStorage write failed:', error);
      // メモリベースの代替手段
      setValue(newValue);
    }
  };

  return [value, setStoredValue];
};

/**
 * サードパーティクッキーなしの認証フック
 * 
 * クッキーを使用せずにローカルストレージベースで
 * ユーザー認証を管理するカスタムフック
 */
export const useCookieFreeAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージベースの認証
    const authData = localStorage.getItem('auth-data');
    if (authData) {
      try {
        const userData = JSON.parse(authData);
        setUser(userData);
      } catch (error) {
        console.warn('Auth data corrupted:', error);
        localStorage.removeItem('auth-data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // サーバーサイド認証（クッキーなし）
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('auth-data', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-data');
    localStorage.removeItem('session-id');
  };

  return { user, isLoading, login, logout };
};

export default CookieConsent;
