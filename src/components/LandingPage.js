import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="hero-section">
          <h1 className="hero-title">KakaoGPT</h1>
          <p className="hero-subtitle">
            다양한 AI 모델과 대화하는 스마트 채팅 플랫폼
          </p>
          <button className="start-button" onClick={handleStartChat}>
            시작하기
          </button>
        </div>

        <div className="features-section">
          <h2 className="features-title">주요 기능</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>다양한 AI 모델</h3>
              <p>ChatGPT와 Google Gemini 중 선택하여 대화할 수 있습니다</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>실시간 채팅</h3>
              <p>빠르고 자연스러운 실시간 대화 경험을 제공합니다</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>채팅 기록 저장</h3>
              <p>대화 내역을 저장하고 언제든지 다시 확인할 수 있습니다</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3>커스터마이징</h3>
              <p>닉네임 설정과 다양한 옵션으로 나만의 채팅 환경을 만들 수 있습니다</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>지금 바로 시작해보세요</h2>
          <button className="cta-button" onClick={handleStartChat}>
            채팅 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
