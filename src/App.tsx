import React, { useState } from 'react';
import './App.css';

interface ChatMessage {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  isOnline: boolean;
}

export default function App() {
  const [chats] = useState<ChatMessage[]>([
    { id: 1, name: "Alex Logan", avatar: "https://liara.run", message: "Hey! Are we still meeting for lunch?", time: "11:45 AM", isOnline: true },
    { id: 2, name: "Sarah Jenkins", avatar: "https://liara.run", message: "Sent you the project files.", time: "9:15 AM", isOnline: false },
    { id: 3, name: "Design Team Group", avatar: "https://liara.run", message: "David: Looks clean!", time: "Yesterday", isOnline: true },
    { id: 4, name: "Mom", avatar: "https://liara.run", message: "Call me when you have a free minute ❤️", time: "Friday", isOnline: false }
  ]);

  return (
    <div className="chat-flyout">
      {/* Top Header Section */}
      <div className="chat-header">
        <span className="header-title">Chat</span>
        <div className="header-actions">
          <button className="action-btn meet-btn">
            <span className="btn-icon">📹</span> Meet
          </button>
          <button className="action-btn chat-btn">
            <span className="btn-icon">💬</span> Chat
          </button>
        </div>
      </div>

      {/* Scrollable Recents List */}
      <div className="chat-body">
        <div className="section-label">Recent</div>
        <div className="chat-list">
          {chats.map((chat) => (
            <div key={chat.id} className="chat-item">
              <div className="avatar-container">
                <img src={chat.avatar} alt={chat.name} className="avatar-img" />
                {chat.isOnline && <div className="online-indicator" />}
              </div>
              <div className="chat-info">
                <div className="chat-row">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <div className="chat-preview">{chat.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom footer wrapper */}
      <div className="chat-footer">
        <a href="#" className="footer-link">Open Microsoft Teams</a>
      </div>
    </div>
  );
}
