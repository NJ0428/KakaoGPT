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
  const messageWrapperClass = isUser ? 'message-wrapper mine' : 'message-wrapper';
  
  return (
    <div className={messageGroupClass}>
      <div className={messageWrapperClass}>
        {!isUser && <img src="./img.jpg" className="chat-img" alt="Profile" />}
        <div className={`chat-box ${isUser ? 'mine' : ''}`}>
          <div className="message-content">{message}</div>
        </div>
        <div className="message-time">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage; 