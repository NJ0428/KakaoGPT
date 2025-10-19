import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  // localStorage에서 초기값 불러오기
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname') || '');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [aiModel, setAiModel] = useState(() => localStorage.getItem('aiModel') || 'gemini');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSave = () => {
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('theme', theme);
    localStorage.setItem('aiModel', aiModel);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="settings-container">
      <h2>설정</h2>
      <div className="settings-item">
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
        />
      </div>
      <div className="settings-item">
        <label>테마</label>
        <div className="theme-toggle">
          <button
            className={theme === 'light' ? 'active' : ''}
            onClick={() => setTheme('light')}
          >
            라이트
          </button>
          <button
            className={theme === 'dark' ? 'active' : ''}
            onClick={() => setTheme('dark')}
          >
            다크
          </button>
        </div>
      </div>
      <div className="settings-item">
        <label>AI 모델</label>
        <div className="theme-toggle">
          <button
            className={aiModel === 'gemini' ? 'active' : ''}
            onClick={() => setAiModel('gemini')}
          >
            Gemini
          </button>
          <button
            className={aiModel === 'gpt' ? 'active' : ''}
            onClick={() => setAiModel('gpt')}
          >
            GPT-4
          </button>
        </div>
      </div>
      <button className="save-btn" onClick={handleSave}>저장</button>
      {saved && <div className="save-msg">저장되었습니다!</div>}
    </div>
  );
};

export default Settings; 