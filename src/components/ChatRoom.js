import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const SOCKET_SERVER_URL = 'http://localhost:3001';

const ChatRoom = ({ chatType, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContentRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 초기 메시지 설정
    if (chatType === 'ai') {
      setMessages([{
        text: '안녕하세요! AI 챗봇입니다. 무엇을 도와드릴까요? 😊',
        isUser: false,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
      }]);
    } else if (chatType === 'websocket') {
      setMessages([{
        text: '실시간 채팅방에 오신 것을 환영합니다! 다른 사람들과 대화해보세요. 🚀',
        isSystem: true,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
      }]);
    }

    // 웹소켓 연결
    if (chatType === 'websocket') {
      socketRef.current = io(SOCKET_SERVER_URL);

      socketRef.current.on('connect', () => {
        console.log('socket connected:', socketRef.current.id);
      });

      socketRef.current.on('chat message', (msg) => {
        const newMessage = { ...msg, isUser: false, timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }) };
        setMessages(prev => [...prev, newMessage]);
      });
      
      const handleSystemMessage = (text) => {
        const systemMessage = { text, isSystem: true, timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }) };
        setMessages(prev => [...prev, systemMessage]);
      };

      socketRef.current.on('user-enter', handleSystemMessage);
      socketRef.current.on('user-leave', handleSystemMessage);

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [chatType]);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    const messageData = { text: userMessage, isUser: true, timestamp: currentTime };
    
    setMessages(prev => [...prev, messageData]);

    if (chatType === 'ai') {
      setIsLoading(true);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const responseMessage = { 
          text: response.text(), 
          isUser: false, 
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }) 
        };
        setMessages(prev => [...prev, responseMessage]);
      } catch (error) {
        console.error('Gemini API 오류:', error);
        const errorMessage = { 
          text: '죄송합니다. 오류가 발생했습니다. 😅', 
          isUser: false,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    } else if (chatType === 'websocket') {
      socketRef.current.emit('chat message', messageData);
    }
  };

  const chatRoomTitle = chatType === 'ai' ? 'AI 어시스턴트' : '실시간 채팅방';
  const chatRoomDescription = chatType === 'ai' ? 'KakaoGPT' : 'WebSocket Live Chat';

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <button onClick={onBack} className="back-button">‹</button>
        <img src="./img.jpg" className="chat-header-profile" alt="Profile" />
        <div className="chat-header-info">
          <h3>{chatRoomDescription}</h3>
          <p>{chatRoomTitle}</p>
        </div>
      </div>
      
      <div className="chat-content" ref={chatContentRef}>
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message.text}
            isUser={message.isUser}
            isSystem={message.isSystem}
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

export default ChatRoom; 