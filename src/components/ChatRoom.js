import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from 'openai';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// OpenAI 클라이언트는 사용 시점에 초기화
let openai = null;
const getOpenAI = () => {
  if (!openai && process.env.REACT_APP_OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }
  return openai;
};

const SOCKET_SERVER_URL = 'http://localhost:3001';

const ChatRoom = ({ chatType, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContentRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // localStorage에서 채팅 기록 불러오기
    const savedMessages = localStorage.getItem(`chat-history-${chatType}`);

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // 저장된 기록이 없을 때만 초기 메시지 설정
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
    }

    // 웹소켓 연결
    if (chatType === 'websocket') {
      socketRef.current = io(SOCKET_SERVER_URL);

      socketRef.current.on('connect', () => {
        console.log('socket connected:', socketRef.current.id);
      });

      socketRef.current.on('chat message', (msg) => {
        const newMessage = {
          ...msg,
          isUser: false,
          timestamp: msg.timestamp || new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
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

  // 메시지가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat-history-${chatType}`, JSON.stringify(messages));
    }
  }, [messages, chatType]);

  const handleSendMessage = async (userMessage) => {
    const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    const nickname = localStorage.getItem('nickname') || '익명';
    const messageData = { text: userMessage, isUser: true, timestamp: currentTime, nickname };

    setMessages(prev => [...prev, messageData]);

    if (chatType === 'ai') {
      setIsLoading(true);
      const selectedModel = localStorage.getItem('aiModel') || 'gemini';

      try {
        // 스트리밍을 위한 빈 메시지 추가
        const streamingMessageIndex = messages.length + 1;
        let accumulatedText = '';

        setMessages(prev => [...prev, {
          text: '',
          isUser: false,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
          isStreaming: true
        }]);

        if (selectedModel === 'gemini') {
          // Gemini 스트리밍
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
          const result = await model.generateContentStream(userMessage);

          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            accumulatedText += chunkText;

            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[streamingMessageIndex] = {
                text: accumulatedText,
                isUser: false,
                timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
                isStreaming: true
              };
              return newMessages;
            });
          }
        } else if (selectedModel === 'gpt') {
          // OpenAI GPT 스트리밍
          const openaiClient = getOpenAI();

          if (!openaiClient) {
            throw new Error('OpenAI API 키가 설정되지 않았습니다. .env.local 파일에 REACT_APP_OPENAI_API_KEY를 설정해주세요.');
          }

          const stream = await openaiClient.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: userMessage }],
            stream: true,
          });

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              accumulatedText += content;

              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[streamingMessageIndex] = {
                  text: accumulatedText,
                  isUser: false,
                  timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
                  isStreaming: true
                };
                return newMessages;
              });
            }
          }
        }

        // 스트리밍 완료 후 isStreaming 플래그 제거
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[streamingMessageIndex] = {
            ...newMessages[streamingMessageIndex],
            isStreaming: false
          };
          return newMessages;
        });
      } catch (error) {
        console.error('AI API 오류:', error);
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

  const handleClearHistory = () => {
    if (window.confirm('채팅 기록을 모두 삭제하시겠습니까?')) {
      localStorage.removeItem(`chat-history-${chatType}`);
      // 초기 메시지로 리셋
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
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <button onClick={onBack} className="back-button">‹</button>
        <img src="./img.jpg" className="chat-header-profile" alt="Profile" />
        <div className="chat-header-info">
          <h3>{chatRoomDescription}</h3>
          <p>{chatRoomTitle}</p>
        </div>
        <button onClick={handleClearHistory} className="clear-history-button" title="채팅 기록 삭제">🗑️</button>
      </div>
      
      <div className="chat-content" ref={chatContentRef}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            isSystem={message.isSystem}
            timestamp={message.timestamp}
            nickname={message.nickname}
            isStreaming={message.isStreaming}
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