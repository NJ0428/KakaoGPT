import React from 'react';

const ChatMessage = ({ message, isUser, isSystem, timestamp }) => {
  if (isSystem) {
    return (
      <div className="system-message-container">
        <div className="system-message">{message}</div>
      </div>
    );
  }

  const messageGroupClass = isUser ? 'message-group mine' : 'message-group';
  
  return (
    <div className={messageGroupClass}>
      <div className="message-wrapper">
        {!isUser && <img src="./img.jpg" className="chat-img" alt="Profile" />}
        <div className={`chat-box ${isUser ? 'mine' : ''}`}>
          {message}
        </div>
        <div className="message-time">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage; 