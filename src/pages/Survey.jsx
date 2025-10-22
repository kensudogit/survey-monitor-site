import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Survey = () => {
  const { id } = useParams();
  const { currentUser, isAuthenticated, addPoints, completeSurvey } = useAuth();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600 mb-6">アンケートに回答するにはログインしてください</p>
        </div>
      </div>
    );
  }

  // デモアンケートデータ
  const surveyData = {
    id: 'survey_1',
    title: 'スマートフォンアプリの使用状況調査',
    description: '日常的に使用しているアプリについて教えてください',
    category: 'テクノロジー',
    points: 50,
    estimatedTime: 5,
    questions: [
      {
        id: 1,
        question: 'あなたが最もよく使用するスマートフォンアプリは何ですか？',
        type: 'single',
        options: ['LINE', 'Instagram', 'Twitter', 'TikTok', 'YouTube', 'その他']
      },
      {
        id: 2,
        question: '1日にスマートフォンを使用する時間はどのくらいですか？',
        type: 'single',
        options: ['1時間未満', '1-3時間', '3-5時間', '5-8時間', '8時間以上']
      },
      {
        id: 3,
        question: 'アプリを選ぶ際に重視する要素は？（複数選択可）',
        type: 'multiple',
        options: ['使いやすさ', 'デザイン', '機能性', 'セキュリティ', '価格', 'レビュー評価']
      }
    ]
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < surveyData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // アンケート完了
      setIsCompleted(true);
      addPoints(surveyData.points);
      completeSurvey(surveyData.id);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-2xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">アンケート完了！</h2>
          <p className="text-gray-600 mb-4">ご協力ありがとうございました</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">+{surveyData.points}ポイント獲得</p>
          </div>
          <button
            onClick={handleFinish}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ダッシュボードに戻る
          </button>
        </div>
      </div>
    );
  }

  const currentQ = surveyData.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Survey Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {surveyData.category}
          </span>
          <span className="text-lg font-bold text-green-600">{surveyData.points}pt</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{surveyData.title}</h1>
        <p className="text-gray-600 mb-4">{surveyData.description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span><i className="fas fa-clock mr-1"></i>{surveyData.estimatedTime}分</span>
          <span><i className="fas fa-question-circle mr-1"></i>{surveyData.questions.length}問</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">進捗</span>
          <span className="text-sm font-medium text-gray-700">
            {currentQuestion + 1} / {surveyData.questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / surveyData.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQ.question}
        </h2>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type={currentQ.type === 'multiple' ? 'checkbox' : 'radio'}
                name={`question_${currentQ.id}`}
                value={option}
                checked={
                  currentQ.type === 'multiple'
                    ? answers[currentQ.id]?.includes(option) || false
                    : answers[currentQ.id] === option
                }
                onChange={(e) => {
                  if (currentQ.type === 'multiple') {
                    const currentAnswers = answers[currentQ.id] || [];
                    const newAnswers = e.target.checked
                      ? [...currentAnswers, option]
                      : currentAnswers.filter(a => a !== option);
                    handleAnswerChange(currentQ.id, newAnswers);
                  } else {
                    handleAnswerChange(currentQ.id, option);
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>前へ
          </button>
          
          <button
            onClick={handleNext}
            disabled={!answers[currentQ.id] || (Array.isArray(answers[currentQ.id]) && answers[currentQ.id].length === 0)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestion === surveyData.questions.length - 1 ? '完了' : '次へ'}
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
