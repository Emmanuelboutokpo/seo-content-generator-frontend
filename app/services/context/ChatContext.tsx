"use client"

import { createContext, useContext, useState } from 'react';

interface ChatContextType {
  activeChat: string | null;
  chats: Array<{id: string, title: string}>;
  setActiveChat: (id: string | null) => void;
  handleNewChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chats, setChats] = useState<Array<{id: string, title: string}>>([]);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setChats([...chats, { id: newChatId, title: `New Chat ${chats.length + 1}`}]);
    setActiveChat(newChatId);
  };

  return (
    <ChatContext.Provider value={{ activeChat, chats, setActiveChat, handleNewChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}