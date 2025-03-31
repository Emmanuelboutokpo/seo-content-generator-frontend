"use client"

import { useState } from 'react';
import { Menu, X, Search, Plus, Download, User, Settings, LucideIceCreamBowl } from 'lucide-react';
import { ContentActionsDropdown } from './ui/dropdown';
import { useChat } from '../services/context/ChatContext';

const SidebarItem = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { activeChat, chats, setActiveChat, handleNewChat } = useChat();
  // Données de démonstration pour les topics
  const topics = [
    { id: '1', title: 'Creating Sidebar Component', date: 'Today' },
    { id: '2', title: 'Django API Error', date: 'Yesterday' },
    { id: '3', title: 'Scikit-learn Overview', date: '7 Days' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleCreateContent = () => {
    console.log('Create new content');
  };

  const handleDelete = (id: string) => {
    console.log('Deleting topic:', id);
  };

  const handleRename = (id: string) => {
    console.log('Renaming topic:', id);
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-900 text-white shadow-md z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
      
      {/* Header avec boutons */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen ? (
          <>
            <div className="flex items-center gap-2">
              <span className="font-semibold">My App</span>
              <button
              onClick={handleNewChat}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Create new content"
            >
               <Plus className="w-5 h-5" />
            </button>

            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col h-[calc(100%-56px)]">
        {isOpen ? (
          <>
            {/* Barre de recherche (visible seulement quand ouvert) */}
            <div className="p-4 border-b border-gray-700">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </form>
            </div>

            {/* Liste des topics */}
            <div className="flex-1 overflow-y-auto">
              {['Today', 'Yesterday', '7 Days'].map((date) => (
                <div key={date} className="px-4 py-2">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{date}</h3>
                  <ul className="mt-2 space-y-1">
                    {topics
                      .filter(topic => topic.date === date)
                      .map(topic => (
                        <li key={topic.id} className="group flex items-center justify-between hover:bg-gray-800 rounded-md">
                          <button
                            onClick={() => setActiveChat(topic.id)}
                            className={`flex-1 text-left px-3 py-2 truncate ${activeChat === topic.id ? 'text-blue-400' : 'text-gray-300'}`}
                          >
                            {topic.title}
                          </button>
                          <ContentActionsDropdown
                            onDelete={() => handleDelete(topic.id)}
                            onRename={() => handleRename(topic.id)}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Vue compacte - seulement les icônes */
          <div className="flex flex-col items-center py-4 space-y-6">
            <button
              onClick={handleNewChat}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Create new content"
            >
               <Plus className="w-5 h-5" />
            </button>
            
            <div className="p-2">
              <LucideIceCreamBowl className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-700 p-4">
          {isOpen ? (
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm hover:text-blue-400">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button className="flex items-center gap-2 text-sm hover:text-blue-400">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <button aria-label="Profile">
                <User className="w-5 h-5" />
              </button>
              <button aria-label="Settings">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;