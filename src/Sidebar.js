import React, { useState } from 'react';

const Sidebar = ({ chats, setCurrentChatId, createNewChat, deleteChat, currentChatId }) => {
  const [newChatTitle, setNewChatTitle] = useState('');

  const handleCreateChat = () => {
    if (newChatTitle.trim()) {
      createNewChat(newChatTitle);
      setNewChatTitle('');
    }
  };

  return (
    <div className="sidebar">
      <input
        type="text"
        value={newChatTitle}
        onChange={(e) => setNewChatTitle(e.target.value)}
        placeholder="New chat title"
      />
      <button onClick={handleCreateChat}>New Chat</button>
      <ul>
        {Object.entries(chats).map(([chatId, chat]) => (
          <li
            key={chatId}
            className={currentChatId === chatId ? 'selected' : ''}
            onClick={() => setCurrentChatId(chatId)}
          >
            <span>{chat.title}</span>
            <button onClick={() => deleteChat(chatId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
