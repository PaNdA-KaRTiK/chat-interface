import React, { useEffect, useRef, useState } from 'react';

const Chat = ({ chat, sendMessage, currentChatId }) => {
    const [messageText, setMessageText] = useState('');
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [chat]);

    const handleSendMessage = () => {
        const messageId = currentChatId + (Object.keys(chat.messages).length + 1);
        if (messageText.trim()) {
            if (messageId === "chat15") 
                sendMessage(currentChatId, messageText, messageId, "chat13");
            else 
                sendMessage(currentChatId, messageText, messageId, "0");
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
        {chat && chat.messages.map((message, index) => {
            const replyMessage =  chat.messages.find(m => m.id === message.replyIdx);
            return (
            <div key={index} className={`message ${message.sent ? 'sent' : 'received'}`}>
                { replyMessage ?
                <div>
                    <div className="meta">{replyMessage.sender}</div>
                    <div className="text">{replyMessage.text}</div> 
                </div> : null }
                <div className="meta">{message.sender} • {message.time} • {message.id}</div>
                <div className="text">{message.text}</div>
            </div>
            )            
        })}
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