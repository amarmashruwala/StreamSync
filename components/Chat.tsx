import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile, Settings, Shield, Star, DollarSign } from 'lucide-react';
import { MOCK_CHAT_MESSAGES, MOCK_CHAT_USERS, MOCK_CHAT_COLORS } from '../constants';
import { ChatMessage } from '../types';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export const Chat: React.FC = () => {
  const { user, openAuthModal } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Initialize with some messages
  useEffect(() => {
    const initial: ChatMessage[] = [];
    for(let i=0; i<10; i++) {
       initial.push(generateRandomMessage());
    }
    setMessages(initial);
  }, []);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setMessages(prev => {
          const newMsgs = [...prev, generateRandomMessage()];
          if (newMsgs.length > 50) newMsgs.shift(); // keep only last 50
          return newMsgs;
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateRandomMessage = (): ChatMessage => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      user: MOCK_CHAT_USERS[Math.floor(Math.random() * MOCK_CHAT_USERS.length)],
      color: MOCK_CHAT_COLORS[Math.floor(Math.random() * MOCK_CHAT_COLORS.length)],
      content: MOCK_CHAT_MESSAGES[Math.floor(Math.random() * MOCK_CHAT_MESSAGES.length)],
      timestamp: Date.now(),
      isModerator: Math.random() > 0.9,
      isSubscriber: Math.random() > 0.7
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      user: user.username,
      color: '#9146FF',
      content: inputValue,
      timestamp: Date.now(),
      isModerator: false,
      isSubscriber: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-dark-card border-l border-black w-80 flex-shrink-0 absolute right-0 top-0 bottom-0 md:relative">
      <div className="h-12 border-b border-black flex items-center justify-center relative flex-shrink-0">
        <h3 className="font-semibold text-sm uppercase text-dark-muted">Stream Chat</h3>
        <button className="absolute right-2 text-dark-muted hover:text-white">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 font-medium text-sm" ref={scrollRef}>
        <div className="text-center text-dark-muted text-xs py-4">
          Welcome to the chat room!
          <br />
          Follow the community guidelines.
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className="py-1 px-2 hover:bg-dark-hover/50 rounded break-words">
            <span className="inline-flex items-center gap-1 mr-1.5 align-middle">
              {msg.isModerator && <Shield className="w-3 h-3 text-green-500 fill-current" />}
              {msg.isSubscriber && <Star className="w-3 h-3 text-brand fill-current" />}
            </span>
            <span style={{ color: msg.color }} className="font-bold cursor-pointer hover:underline mr-1.5">
              {msg.user}:
            </span>
            <span className="text-dark-text">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-black flex-shrink-0">
        {user ? (
          <form onSubmit={handleSendMessage} className="space-y-2">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Send a message"
                className="w-full bg-black/30 border border-dark-muted/30 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
              <button type="button" className="absolute right-2 top-2 text-dark-muted hover:text-brand">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                 <button type="button" className="text-brand hover:text-brand-light font-bold text-sm flex items-center gap-1">
                   <div className="p-1 rounded bg-dark-hover">
                      <DollarSign className="w-4 h-4" />
                   </div>
                   <span className="text-xs">Bits</span>
                 </button>
              </div>
              <Button type="submit" size="sm" variant={inputValue ? 'primary' : 'secondary'} disabled={!inputValue}>
                Chat
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-2 py-2">
            <p className="text-xs text-dark-muted">Log in to chat</p>
            <Button size="sm" className="w-full" onClick={openAuthModal}>Log In</Button>
          </div>
        )}
      </div>
    </div>
  );
};