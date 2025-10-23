import React, { useState, useEffect, useRef } from 'react';
import ModernChart from './ModernChart';

const DomoAIChat = ({ onClose, dashboardData }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 初期メッセージを設定
    const initialMessages = [
      {
        id: 1,
        type: 'ai',
        content: `Welcome back! It's been 4 days since your last visit. Let's help you get caught up...`,
        timestamp: new Date()
      },
      {
        id: 2,
        type: 'ai',
        content: 'Here is the last chart you reviewed:',
        timestamp: new Date(),
        chart: {
          title: 'SF area median rental prices 2000-2018',
          type: 'bar',
          data: [
            { value: 1200, label: '2000' },
            { value: 1350, label: '2002' },
            { value: 1500, label: '2004' },
            { value: 1650, label: '2006' },
            { value: 1800, label: '2008' },
            { value: 1950, label: '2010' },
            { value: 2100, label: '2012' },
            { value: 2250, label: '2014' },
            { value: 2400, label: '2016' },
            { value: 2550, label: '2018' }
          ]
        }
      },
      {
        id: 3,
        type: 'ai',
        content: "Here's a map just been generated for you based on your interests about San Francisco rental prices:",
        timestamp: new Date(),
        map: {
          title: 'San Francisco Rental Price Map',
          data: [
            { lat: 37.7749, lng: -122.4194, price: 3500, area: 'Downtown' },
            { lat: 37.7849, lng: -122.4094, price: 2800, area: 'Mission' },
            { lat: 37.7649, lng: -122.4294, price: 4200, area: 'Marina' },
            { lat: 37.7549, lng: -122.4394, price: 3200, area: 'Castro' }
          ]
        }
      }
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // AI応答をシミュレート
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      {
        content: "Based on your current data, I can see that your revenue has increased by 12.5% this month. Would you like me to analyze the factors contributing to this growth?",
        insights: [
          "Mobile traffic increased by 23%",
          "Conversion rate improved by 0.3%",
          "Average order value increased by 8%"
        ]
      },
      {
        content: "I've identified a potential risk in your data quality metrics. The system performance risk is at 72%. Here are my recommendations:",
        recommendations: [
          "Optimize database queries",
          "Implement caching strategies",
          "Monitor server resources"
        ]
      },
      {
        content: "Your customer satisfaction score is excellent at 4.6/5! This is contributing positively to your overall business metrics.",
        chart: {
          title: 'Customer Satisfaction Trend',
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
              label: 'Satisfaction Score',
              data: [4.2, 4.3, 4.4, 4.5, 4.6],
              borderColor: 'rgba(34, 197, 94, 1)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)'
            }]
          }
        }
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now() + 1,
      type: 'ai',
      content: randomResponse.content,
      timestamp: new Date(),
      ...randomResponse
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed right-4 bottom-4 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
            <i className="fas fa-brain text-white"></i>
          </div>
          <div>
            <h3 className="font-semibold">DOMO.AI</h3>
            <p className="text-xs text-blue-100">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-white hover:text-blue-200 text-sm">
            Start Notebook
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              
              {/* Chart Display */}
              {message.chart && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{message.chart.title}</h4>
                  <div className="h-32">
                    <ModernChart
                      type={message.chart.type}
                      data={message.chart.data}
                      height={128}
                    />
                  </div>
                </div>
              )}

              {/* Map Display */}
              {message.map && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{message.map.title}</h4>
                  <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <i className="fas fa-map text-2xl mb-2"></i>
                      <p className="text-xs">Interactive Map</p>
                      <p className="text-xs">({message.map.data.length} data points)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Insights */}
              {message.insights && (
                <div className="mt-2 p-3 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-900 mb-2">Key Insights:</h4>
                  <ul className="text-xs text-green-800 space-y-1">
                    {message.insights.map((insight, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-check-circle mr-2 text-green-600"></i>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {message.recommendations && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Recommendations:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    {message.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-lightbulb mr-2 text-blue-600"></i>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Domo.AI anything..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Try asking: "Show me revenue trends" or "What are the top risks?"
        </p>
      </div>
    </div>
  );
};

export default DomoAIChat;
