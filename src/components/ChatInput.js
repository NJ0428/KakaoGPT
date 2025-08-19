import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chat-input-container">
      <div className="input-wrapper">
        <input
          className="chat-input"
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          disabled={isLoading}
          autoComplete="off"
          maxLength={1000}
        />
      </div>
      <button
        className={`send-button ${isLoading || !message.trim() ? 'disabled' : 'active'}`}
        onClick={handleSubmit}
        disabled={isLoading || !message.trim()}
        type="button"
      >
        <span className="send-button-text">
          {isLoading ? '전송중...' : '전송'}
        </span>
      </button>
    </div>
  );
};

export default ChatInput; 