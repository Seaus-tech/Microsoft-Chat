import React, { useState, useRef, useEffect } from 'react';
import {
  FluentProvider,
  webLightTheme,
  Button,
  Text,
  Avatar,
  Input,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  Video20Filled,
  Chat20Regular,
  ArrowLeft20Regular,
  Send20Filled,
  Phone20Regular,
  Video20Regular,
  MoreHorizontal20Regular,
  Attach20Regular,
  Emoji20Regular,
  ChevronDown12Regular,
} from '@fluentui/react-icons';
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

const useStyles = makeStyles({
  meetBtn: {
    backgroundColor: '#5c5fc8',
    color: 'white',
    width: '100%',
    fontWeight: '600',
    height: '36px',
    border: 'none',
    ':hover': {
      backgroundColor: '#4f46e5',
      color: 'white',
    },
    ':hover:active': {
      backgroundColor: '#3e38b1',
    },
  },
  chatBtn: {
    backgroundColor: 'white',
    color: '#242424',
    width: '100%',
    fontWeight: '600',
    height: '36px',
    border: '1px solid #d2d2d2',
    ':hover': {
      backgroundColor: '#f3f2f1',
      color: '#242424',
      border: '1px solid #c8c6c4',
    },
    ':hover:active': {
      backgroundColor: '#edebe9',
    },
  },
  recentLabel: {
    paddingLeft: '16px',
    paddingTop: '12px',
    paddingBottom: '6px',
    display: 'block',
    color: '#242424',
    fontSize: '14px',
  },
  messageInput: {
    width: '100%',
    height: '36px',
    backgroundColor: '#ffffff',
    border: '1px solid #c8c6c4',
    borderRadius: '4px',
    ...shorthands.padding('0px', '8px'),
    ':hover': {
      borderColor: '#a19f9d',
    },
    ':focus-within': {
      borderColor: '#5c5fc8',
      outline: 'none',
    }
  }
});

export default function App() {
  const styles = useStyles();
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    { 
      id: 1, 
      name: "Anish Malpani", 
      avatar: "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AnishMalpani.jpg", 
      lastMessage: "Let's check out the new design tomorrow!", 
      time: "2:54 PM", 
      isOnline: true, 
      history: [
        { id: 101, sender: 'them', text: "Hey Michelle! Are you ready for the design review?", time: "2:50 PM" },
        { id: 102, sender: 'me', text: "Yes, I've got the presentation slides updated.", time: "2:52 PM" },
        { id: 103, sender: 'them', text: "Let's check out the new design tomorrow!", time: "2:54 PM" }
      ] 
    },
    { 
      id: 2, 
      name: "Marta Fuentes", 
      avatar: "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MartaFuentes.jpg", 
      lastMessage: "Awesome, thanks for sharing!", 
      time: "1:12 PM", 
      isOnline: true, 
      history: [
        { id: 201, sender: 'me', text: "Did you see the Windows 11 updates?", time: "1:10 PM" },
        { id: 202, sender: 'them', text: "Awesome, thanks for sharing!", time: "1:12 PM" }
      ] 
    },
    { 
      id: 3, 
      name: "Michael King", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", 
      lastMessage: "Are we still on for the sync?", 
      time: "11:05 AM", 
      isOnline: false, 
      history: [
        { id: 301, sender: 'them', text: "Are we still on for the sync?", time: "11:05 AM" }
      ] 
    },
    { 
      id: 4, 
      name: "The Thorne Family", 
      avatar: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=150", 
      lastMessage: "See you all on Sunday!", 
      time: "Yesterday", 
      isOnline: true, 
      history: [
        { id: 401, sender: 'them', text: "See you all on Sunday!", time: "Yesterday" }
      ] 
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChat) return;

    const newMsg: Message = { 
      id: Date.now(), 
      sender: 'me', 
      text: typedMessage.trim(), 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    const updatedHistory = [...activeChat.history, newMsg];
    
    // Update the conversation state in the master list
    setChats(chats.map(c => c.id === activeChat.id ? { 
      ...c, 
      lastMessage: typedMessage.trim(), 
      time: "Just now", 
      history: updatedHistory 
    } : c));
    
    // Update active chat thread state
    setActiveChat({ ...activeChat, history: updatedHistory });
    setTypedMessage('');
  };

  const handleChatSelect = (chat: Chat) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveChat(chat);
      setIsTransitioning(false);
    }, 150);
  };

  const handleBackToList = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveChat(null);
      setIsTransitioning(false);
    }, 150);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.history]);

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={`ms-chat-container ${isTransitioning ? 'transitioning' : ''}`}>
        {!activeChat ? (
          <>
            {/* Header displaying profile name Michelle Vila & Meet/Chat buttons */}
            <div className="ms-chat-nav">
              <div className="ms-profile-header">
                <Avatar
                  size={36}
                  name="Michelle Vila"
                  image={{ src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" }}
                  badge={{ status: 'available' }}
                />
                <div className="ms-profile-info">
                  <Text weight="semibold" size={300} className="ms-profile-name">Michelle Vila</Text>
                  <div className="ms-presence-container">
                    <span className="ms-presence-dot"></span>
                    <Text size={100} className="ms-presence-text">Available</Text>
                    <ChevronDown12Regular className="ms-chevron-icon" />
                  </div>
                </div>
              </div>
              
              <div className="ms-nav-buttons">
                <div className="ms-nav-btn-col">
                  <Button 
                    icon={<Video20Filled />} 
                    className={styles.meetBtn}
                    appearance="primary"
                  >
                    Meet
                  </Button>
                </div>
                <div className="ms-nav-btn-col">
                  <Button 
                    icon={<Chat20Regular />} 
                    className={styles.chatBtn}
                  >
                    Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Scrollable Conversation List under bold Recent label */}
            <div className="ms-chat-body">
              <Text size={200} weight="bold" className={styles.recentLabel}>Recent</Text>
              <div className="ms-list">
                {chats.map(chat => (
                  <div 
                    key={chat.id} 
                    className="ms-item" 
                    onClick={() => handleChatSelect(chat)}
                  >
                    <Avatar
                      size={40}
                      image={{ src: chat.avatar }}
                      name={chat.name}
                      badge={{ status: chat.isOnline ? 'available' : 'offline' }}
                    />
                    <div className="ms-item-details">
                      <div className="ms-item-row">
                        <Text weight="semibold" size={300} className="ms-item-name">{chat.name}</Text>
                        <Text size={100} className="ms-item-time">{chat.time}</Text>
                      </div>
                      <Text size={200} className="ms-item-preview" block truncate>{chat.lastMessage}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Link */}
            <div className="ms-chat-footer">
              <Button appearance="subtle" className="ms-footer-action">
                Open Microsoft Teams
              </Button>
            </div>
          </>
        ) : (
          /* Functional Active Chat Thread Screen */
          <div className="ms-thread-view">
            {/* Thread Header */}
            <div className="ms-thread-header">
              <div className="ms-thread-header-left">
                <Button 
                  appearance="subtle" 
                  icon={<ArrowLeft20Regular />} 
                  onClick={handleBackToList} 
                  className="ms-back-button"
                />
                <Avatar 
                  size={32} 
                  image={{ src: activeChat.avatar }} 
                  name={activeChat.name}
                  badge={{ status: activeChat.isOnline ? 'available' : 'offline' }}
                />
                <div className="ms-thread-header-title">
                  <Text weight="semibold" size={300} className="ms-thread-name">{activeChat.name}</Text>
                  <Text size={100} className="ms-thread-status">
                    {activeChat.isOnline ? 'Active now' : 'Offline'}
                  </Text>
                </div>
              </div>
              <div className="ms-thread-header-actions">
                <Button appearance="subtle" icon={<Video20Regular />} size="small" />
                <Button appearance="subtle" icon={<Phone20Regular />} size="small" />
                <Button appearance="subtle" icon={<MoreHorizontal20Regular />} size="small" />
              </div>
            </div>

            {/* Scrollable Message History Area */}
            <div className="ms-thread-messages">
              {activeChat.history.map(msg => (
                <div key={msg.id} className={`ms-bubble-row ${msg.sender}`}>
                  {msg.sender === 'them' && (
                    <Avatar 
                      size={24} 
                      image={{ src: activeChat.avatar }} 
                      name={activeChat.name}
                      className="ms-bubble-avatar"
                    />
                  )}
                  <div className={`ms-bubble-container ${msg.sender}`}>
                    <div className={`ms-bubble ${msg.sender}`}>
                      <Text size={200}>{msg.text}</Text>
                    </div>
                    <Text size={100} className="ms-bubble-time">{msg.time}</Text>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Form and Rich Input Controls */}
            <div className="ms-thread-input-area">
              <div className="ms-input-controls">
                <Button appearance="subtle" icon={<Attach20Regular />} size="small" />
                <Button appearance="subtle" icon={<Emoji20Regular />} size="small" />
              </div>
              <form className="ms-thread-input-box" onSubmit={handleSendMessage}>
                <Input
                  value={typedMessage}
                  onChange={(e, data) => setTypedMessage(data.value)}
                  placeholder={`Reply to ${activeChat.name}...`}
                  contentAfter={
                    <Button
                      appearance="transparent"
                      icon={<Send20Filled />}
                      type="submit"
                      disabled={!typedMessage.trim()}
                      className={`ms-send-icon-button ${typedMessage.trim() ? 'active' : ''}`}
                    />
                  }
                  className={styles.messageInput}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </FluentProvider>
  );
}
