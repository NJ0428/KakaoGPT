import React from 'react';
import './ChatSelection.css';

const ChatSelection = ({ onSelectChat }) => {
  return (
    <div className="selection-container">
      <h1 className="selection-title">채팅방을 선택하세요</h1>
      <div className="selection-options">
        <div className="selection-option" onClick={() => onSelectChat('ai')}>
          <div className="selection-icon">🤖</div>
          <h2 className="selection-option-title">AI와 대화하기</h2>
          <p className="selection-option-description">인공지능 챗봇과 대화해보세요.</p>
        </div>
        <div className="selection-option" onClick={() => onSelectChat('websocket')}>
          <div className="selection-icon">⚡️</div>
          <h2 className="selection-option-title">실시간 채팅방</h2>
          <p className="selection-option-description">웹소켓을 이용한 실시간 그룹 채팅에 참여하세요.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatSelection; 