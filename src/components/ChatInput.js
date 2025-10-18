import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // 이모지 피커 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-input-container">
      <button
        className="emoji-button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        type="button"
        disabled={isLoading}
      >
        😀
      </button>
      {showEmojiPicker && (
        <div className="emoji-picker-wrapper" ref={emojiPickerRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
            searchPlaceHolder="이모지 검색..."
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
      <div className="input-wrapper">
        <input
          className="chat-input"
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          disabled={isLoading}
          autoComplete="off"
          maxLength={1000}
        />
      </div>
      <button
        className={`send-button ${isLoading || !message.trim() ? 'disabled' : 'active'}`}
        onClick={handleSubmit}
        disabled={isLoading || !message.trim()}
        type="button"
      >
        <span className="send-button-text">
          {isLoading ? '전송중...' : '전송'}
        </span>
      </button>
    </div>
  );
};

export default ChatInput; 