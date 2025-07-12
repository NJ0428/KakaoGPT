import React, { useState } from 'react';
import './App.css';
import ChatSelection from './components/ChatSelection';
import ChatRoom from './components/ChatRoom';

function App() {
  const [chatType, setChatType] = useState(null);

  const handleSelectChat = (type) => {
    setChatType(type);
  };

  const handleBackToSelection = () => {
    setChatType(null);
  };

  return (
    <div>
      {!chatType ? (
        <ChatSelection onSelectChat={handleSelectChat} />
      ) : (
        <ChatRoom chatType={chatType} onBack={handleBackToSelection} />
      )}
    </div>
  );
}

export default App; 