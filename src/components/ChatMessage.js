import React from 'react';

const ChatMessage = ({ message, isUser, isSystem, timestamp, nickname, isStreaming }) => {
  if (isSystem) {
    return (
      <div className="system-message-container">
        <div className="system-message">{message}</div>
      </div>
    );
  }

  const messageGroupClass = isUser ? 'message-group mine' : 'message-group';
  const messageWrapperClass = isUser ? 'message-wrapper mine' : 'message-wrapper';
  const chatBoxClass = `chat-box ${isUser ? 'mine' : ''} ${isStreaming ? 'streaming' : ''}`;

  return (
    <div className={messageGroupClass}>
      {!isUser && nickname && <div className="message-nickname">{nickname}</div>}
      <div className={messageWrapperClass}>
        {!isUser && <img src="./img.jpg" className="chat-img" alt="Profile" />}
        <div className={chatBoxClass}>
          <div className="message-content">{message}</div>
        </div>
        <div className="message-time">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage; 