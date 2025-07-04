import React from 'react';

const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <div className={`message-group ${isUser ? 'mine' : ''}`}>
      <div className={`message-wrapper ${isUser ? 'mine' : ''}`}>
        {!isUser && (
          <img src="./img.jpg" className="chat-img" alt="Profile" />
        )}
        <div className={`chat-box ${isUser ? 'mine' : ''}`}>
          {message}
        </div>
        {timestamp && (
          <div className="message-time">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage; 