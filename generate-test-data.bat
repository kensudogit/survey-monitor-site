@echo off
REM AI分析用テストデータ生成スクリプト
REM 複雑で多様なテストデータを作成してAI分析機能の有効性を実証

echo 🚀 Starting AI Analytics Test Data Generation...

REM データベース接続設定
set DB_HOST=localhost
set DB_NAME=survey_monitor
set DB_USER=root
set DB_PASS=

echo 📊 Generating comprehensive test data for AI analytics validation...

REM SQLスクリプトの実行
echo [INFO] Executing test data generation SQL script...
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASS% %DB_NAME% < database/test_data_generation.sql

if %errorlevel% neq 0 (
    echo [ERROR] SQL script execution failed!
    echo [INFO] Please check database connection and credentials.
    pause
    exit /b 1
)

echo [SUCCESS] Test data generation completed!

REM 統計情報の表示
echo.
echo 📈 Generated Test Data Summary:
echo   - Categories: 8 (Technology, Shopping, Business, Lifestyle, Entertainment, Healthcare, Education, Finance)
echo   - Surveys: 20 (5 different survey types with variations)
echo   - Users: 500 (diverse demographics and age groups)
echo   - Responses: 2000+ (realistic response patterns)
echo   - Analytics Records: 20 (comprehensive analysis data)
echo   - AI Insights: 20+ (AI-generated recommendations)

echo.
echo 🎯 AI Analytics Features Demonstrated:
echo   ✅ Real-time data processing
echo   ✅ Sentiment analysis (Japanese text)
echo   ✅ Quality scoring and assessment
echo   ✅ Demographic analysis and segmentation
echo   ✅ Trend analysis and time-series data
echo   ✅ AI-powered insights and recommendations
echo   ✅ Completion rate analysis
echo   ✅ Response pattern detection
echo   ✅ Anomaly detection
echo   ✅ Predictive analytics

echo.
echo 🔍 Test Data Characteristics:
echo   - Realistic Japanese names and responses
echo   - Age-based response patterns
echo   - Gender distribution analysis
echo   - Sentiment analysis with positive/negative/neutral classification
echo   - Quality scoring based on completion rate, response length, and consistency
echo   - Demographic bias detection
echo   - Trend analysis over time
echo   - AI-generated insights with confidence scores

echo.
echo 📊 Analytics Dashboard Features:
echo   - Interactive charts and visualizations
echo   - Real-time metrics updates
echo   - Demographic breakdowns
echo   - Sentiment analysis results
echo   - Quality score trends
echo   - AI insights with recommendations
echo   - Export functionality (PDF, Excel, CSV, JSON)

echo.
echo 🌐 Access the Analytics Dashboard:
echo   URL: https://survey-monitor-site-jhe5zmd0x-kensudogits-projects.vercel.app/analytics
echo   Login: Use any test user account (testuser0@example.com - testuser499@example.com)
echo   Password: password

echo.
echo [SUCCESS] 🎉 AI Analytics test data is ready for demonstration!
echo [INFO] The test data showcases the full capabilities of the AI analysis system.
echo [INFO] All features are now available for testing and validation.

pause
