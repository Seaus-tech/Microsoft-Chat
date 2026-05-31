import React, { useState } from 'react';
import './App.css';

interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  history: Message[];
}

export default function App() {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: "Anish Malpani", avatar: "https://liara.run", lastMessage: "Let's check out the new design tomorrow!", time: "2:54 PM", isOnline: true, history: [{ id: 1, sender: 'them', text: "Let's check out the new design tomorrow!", time: "2:54 PM" }] },
    { id: 2, name: "Marta Fuentes", avatar: "https://liara.run", lastMessage: "Awesome, thanks for sharing!", time: "1:12 PM", isOnline: true, history: [{ id: 1, sender: 'them', text: "Awesome, thanks for sharing!", time: "1:12 PM" }] },
    { id: 3, name: "Michael King", avatar: "https://liara.run2", lastMessage: "Are we still on for the sync?", time: "11:05 AM", isOnline: false, history: [{ id: 1, sender: 'them', text: "Are we still on for the sync?", time: "11:05 AM" }] },
    { id: 4, name: "The Thorne Family", avatar: "https://liara.run", lastMessage: "See you all on Sunday!", time: "Yesterday", isOnline: true, history: [{ id: 1, sender: 'them', text: "See you all on Sunday!", time: "Yesterday" }] }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChat) return;

    const newMsg: Message = { id: Date.now(), sender: 'me', text: typedMessage, time: "Just now" };
    const updatedHistory = [...activeChat.history, newMsg];
    
    setChats(chats.map(c => c.id === activeChat.id ? { ...c, lastMessage: typedMessage, time: "Just now", history: updatedHistory } : c));
    setActiveChat({ ...activeChat, history: updatedHistory });
    setTypedMessage('');
  };

  return (
    <div className="ms-chat-container">
      {!activeChat ? (
        <>
          {/* Authentic 21H2 Navigation Bar */}
          <div className="ms-chat-nav">
            <span className="ms-profile-name">Michelle Vila</span>
            <div className="ms-nav-buttons">
              <button className="ms-nav-btn meet-accent">
                <span className="ms-icon">📹</span> Meet
              </button>
              <button className="ms-nav-btn text-accent">
                <span className="ms-icon">💬</span> Chat
              </button>
            </div>
          </div>

          {/* Chat List Body */}
          <div className="ms-chat-body">
            <div className="ms-section-header">Recent</div>
            <div className="ms-list">
              {chats.map(chat => (
                <div key={chat.id} className="ms-item" onClick={() => setActiveChat(chat)}>
                  <div className="ms-avatar-wrapper">
                    <img src={chat.avatar} className="ms-avatar" alt="" />
                    {chat.isOnline && <div className="ms-badge-online" />}
                  </div>
                  <div className="ms-item-details">
                    <div className="ms-item-row">
                      <span className="ms-item-name">{chat.name}</span>
                      <span className="ms-item-time">{chat.time}</span>
                    </div>
                    <div className="ms-item-preview">{chat.lastMessage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ms-chat-footer">
            <button className="ms-footer-action">Open Microsoft Teams</button>
          </div>
        </>
      ) : (
        /* Actual Functional Chat Thread Sub-View */
        <div className="ms-thread-view">
          <div className="ms-thread-header">
            <button className="ms-back-arrow" onClick={() => setActiveChat(null)}>←</button>
            <span className="ms-thread-title">{activeChat.name}</span>
          </div>
          <div className="ms-thread-messages">
            {activeChat.history.map(msg => (
              <div key={msg.id} className={`ms-bubble-row ${msg.sender}`}>
                <div className={`ms-bubble ${msg.sender}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form className="ms-thread-input-box" onSubmit={handleSendMessage}>
            <input type="text" placeholder="Type a message..." value={typedMessage} onChange={e => setTypedMessage(e.target.value)} />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
