import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './App.css';

const App = () => {
  const [chats, setChats] = useState({
    chat1: { title: 'Chat 1', messages: [] },
    chat2: { title: 'Chat 2', messages: [] }
  });
  const [currentChatId, setCurrentChatId] = useState(null);

  const createNewChat = (title) => {
    const chatId = 'chat' + (Object.keys(chats).length + 1);
    setChats({ ...chats, [chatId]: { title, messages: [] } });
    setCurrentChatId(chatId);
  };

  const sendMessage = (chatId, text) => {
    if (!text) return;
    const newMessage = {
      sender: 'You',
      text,
      time: new Date().toLocaleTimeString(),
      sent: true
    };
    const updatedChat = { ...chats[chatId], messages: [...chats[chatId].messages, newMessage] };
    setChats({ ...chats, [chatId]: updatedChat });
  };

  const deleteChat = (chatId) => {
    const updatedChats = { ...chats };
    delete updatedChats[chatId];
    setChats(updatedChats);
    if (currentChatId === chatId) setCurrentChatId(null);
  };

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        setCurrentChatId={setCurrentChatId}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
        currentChatId={currentChatId}
      />
      <Chat
        chat={chats[currentChatId]}
        sendMessage={sendMessage}
        currentChatId={currentChatId}
      />
    </div>
  );
};

export default App;
