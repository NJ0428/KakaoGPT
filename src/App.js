import React, { useState } from 'react';
import './App.css';
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
            <Link to="/">채팅</Link>
            <Link to="/settings" style={{ marginLeft: 12 }}>설정</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={!chatType ? (
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