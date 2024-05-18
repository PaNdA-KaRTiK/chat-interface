import React, { useEffect, useRef, useState } from 'react';

const Chat = ({ chat, sendMessage, currentChatId }) => {
  const [messageText, setMessageText] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
        sendMessage(currentChatId, messageText);
        setMessageText('');
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <span>{chat ? chat.title : 'Select a chat'}</span>
      </div>
      <div className="message-display-area">
        {chat && chat.messages.map((message, index) => (
          <div key={index} className={`message ${message.sent ? 'sent' : 'received'}`}>
            <div className="meta">{message.sender} • {message.time}</div>
            <div className="text">{message.text}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      {chat && (
        <div className="message-input-area">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;