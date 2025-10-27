import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import ChatSelection from './components/ChatSelection';
import ChatRoom from './components/ChatRoom';
import Settings from './components/Settings';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [chatType, setChatType] = useState(null);

  const handleSelectChat = (type) => {
    setChatType(type);
  };

  const handleBackToSelection = () => {
    setChatType(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>KakaoGPT</h1>
          <nav>
            <Link to="/">홈</Link>
            <Link to="/chat" style={{ marginLeft: 12 }}>채팅</Link>
            <Link to="/settings" style={{ marginLeft: 12 }}>설정</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={!chatType ? (
              <ChatSelection onSelectChat={handleSelectChat} />
            ) : (
              <ChatRoom chatType={chatType} onBack={handleBackToSelection} />
            )} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 