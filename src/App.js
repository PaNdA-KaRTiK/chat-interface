import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './App.css';

const App = () => {
  const [chats, setChats] = useState({
    chat1: {
      title: 'Chat 1',
      messages: [{
          id: "chat11",
          sender: 'You',
          text: "Hi",
          replyIdx: 0,
          time: new Date().toLocaleTimeString(),
          sent: true
        },
        {
          id: "chat12",
          sender: 'You',
          text: "Hello",
          replyIdx: 0,
          time: new Date().toLocaleTimeString(),
          sent: true
        }
      ]
    },
    chat2: {
      title: 'Chat 2',
      messages: []
    }
  });
  const [currentChatId, setCurrentChatId] = useState('');

  const createNewChat = (title) => {
    const chatId = 'chat' + (Object.keys(chats).length + 1);
    setChats({
      ...chats,
      [chatId]: {
        title,
        messages: []
      }
    });
    setCurrentChatId(chatId);
  };

  const sendMessage = (chatId, text, messageId, replyIdx) => {
    if (!text) return;
    const newMessage = {
      id: messageId,
      sender: 'You',
      text,
      replyIdx,
      time: new Date().toLocaleTimeString(),
      sent: true
    };
    const updatedChat = {
      ...chats[chatId],
      messages: [...chats[chatId].messages, newMessage]
    };
    setChats({
      ...chats,
      [chatId]: updatedChat
    });
  };

  const deleteChat = (chatId) => {
    const updatedChats = {
      ...chats
    };
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
