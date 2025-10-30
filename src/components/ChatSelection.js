import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatSelection.css';

const ChatSelection = ({ onSelectChat }) => {
  const navigate = useNavigate();

  return (
    <main className="selection-container">
      <div className="selection-header">
        <h1 className="selection-title">어떤 대화를 시작할까요?</h1>
        <p className="selection-subtitle">
          AI와 대화하며 아이디어를 얻거나, 실시간 채팅방에서 소통해보세요.
        </p>
      </div>

      <section className="selection-options">
        <div className="selection-option" onClick={() => onSelectChat('ai')}>
          <div className="selection-icon">🤖</div>
          <div className="selection-text">
            <h2 className="selection-option-title">AI와 대화하기</h2>
            <p className="selection-option-description">
              카카오의 강력한 AI 모델과 자유롭게 대화하며 새로운 영감을 얻어보세요.
            </p>
          </div>
        </div>
        <div className="selection-option" onClick={() => onSelectChat('websocket')}>
          <div className="selection-icon">⚡️</div>
          <div className="selection-text">
            <h2 className="selection-option-title">실시간 그룹 채팅</h2>
            <p className="selection-option-description">
              다른 사용자들과 함께 웹소켓 기반 실시간 채팅방에 참여하여 소통하세요.
            </p>
          </div>
        </div>
      </section>

      <footer className="selection-footer">
        <button onClick={() => navigate('/')} className="back-button">
          메인으로 돌아가기
        </button>
      </footer>
    </main>
  );
};

export default ChatSelection;