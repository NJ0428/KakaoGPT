import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

// Gemini 클라이언트 초기화 (API 키는 .env.local 파일에서 가져옵니다)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

function App() {
  const [messages, setMessages] = useState([
    { 
      text: '안녕하세요! 무엇을 도와드릴까요? 😊', 
      isUser: false, 
      timestamp: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContentRef = useRef(null);

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    const currentTime = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    // 사용자 메시지 추가
    const newMessages = [...messages, { 
      text: userMessage, 
      isUser: true, 
      timestamp: currentTime 
    }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Gemini API 호출
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const responseMessage = response.text();

      const responseTime = new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      // AI 응답 메시지 추가
      setMessages(prev => [...prev, { 
        text: responseMessage, 
        isUser: false, 
        timestamp: responseTime 
      }]);
    } catch (error) {
      console.error('Gemini API 오류:', error);
      const errorTime = new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setMessages(prev => [...prev, { 
        text: '죄송합니다. 오류가 발생했습니다. API 키를 확인해주세요. 😅', 
        isUser: false,
        timestamp: errorTime
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <img src="./img.jpg" className="chat-header-profile" alt="Profile" />
        <div className="chat-header-info">
          <h3>KakaoGPT</h3>
          <p>AI 어시스턴트</p>
        </div>
      </div>
      
      <div className="chat-content" ref={chatContentRef}>
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="message-group">
            <div className="message-wrapper">
              <img src="./img.jpg" className="chat-img" alt="Profile" />
              <div className="chat-box loading-message">
                답변을 생성중<span className="loading-dots">...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App; 