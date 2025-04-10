"use client"

import { useEffect, useState, useCallback } from 'react';
import { Menu, X, Search, Plus, User, Settings, LucideIceCreamBowl } from 'lucide-react';
import { ContentActionsDropdown } from './ui/dropdown';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/lib/store';
import { 
  deleteArticle, 
  fetchInitialArticles, 
  fetchMoreArticles, 
  setActiveArticle,
  createArticle,
  updateArticle,
  Article
} from '../lib/features/articleSlice';

const SidebarItem = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  // Sélection des états depuis Redux
  const {
    articles,
    isLoading,
    isFetchingMore,
    pagination,
    error,
    activeArticle
  } = useSelector((state: RootState) => state.art);

  // Chargement initial
  useEffect(() => {
    dispatch(fetchInitialArticles());
  }, [dispatch]);

  // Gestion du scroll infini avec useCallback pour optimisation
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= 
      document.documentElement.offsetHeight - 100 &&
      !isLoading && 
      !isFetchingMore && 
      pagination.next
    ) {
      dispatch(fetchMoreArticles());
    }
  }, [dispatch, isLoading, isFetchingMore, pagination.next]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Grouper les articles par date
  const groupedArticles = articles?.reduce((acc, article) => {
    const diff = new Date().getTime() - new Date(article.created_at).getTime();
    let group;
    
    if (diff < 86400000) group = 'Today';
    else if (diff < 172800000) group = 'Yesterday';
    else group = 'Older';
    
    if (!acc[group]) acc[group] = [];
    acc[group].push(article);
    return acc;
  }, {} as Record<string, Article[]>);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleCreateArticle = async () => {
    router.push(`/dashboard/`);
  };

  const handleArticleClick = (id: string) => {
    dispatch(setActiveArticle(id));
    router.push(`/dashboard/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteArticle(id)).unwrap();
      if (activeArticle?.id === id) {
        dispatch(setActiveArticle(null));
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const handleRenameSubmit = async (id: string) => {
    try {
      await dispatch(updateArticle({ 
        id, 
        updates: { topic: newTitle } 
      })).unwrap();
      setRenamingId(null);
    } catch (err) {
      console.error("Failed to rename article:", err);
    }
  };

  if (isLoading && articles.length === 0) {
    return (
      <div className={`fixed left-0 top-0 h-screen bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex items-center justify-center h-full">
          Chargement initial...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`fixed left-0 top-0 h-screen bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 text-red-500">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-900 text-white shadow-md z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen ? (
          <>
            <div className="flex items-center gap-2">
              <span className="font-semibold">SEO App</span>
              <button
                onClick={handleCreateArticle}
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
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Contenu principal */}
      <div className={`flex flex-col h-[calc(100%-56px)] ${isOpen ? '' : 'justify-between'}`}>
        {isOpen ? (
          <>
            {/* Barre de recherche */}
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

            {/* Liste des articles */}
            <div className="flex-1 overflow-y-auto">
              {groupedArticles && Object.entries(groupedArticles).map(([date, articles]) => (
                articles.length > 0 && (
                  <div key={date} className="px-4 py-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{date}</h3>
                    <ul className="mt-2 space-y-1">
                      {articles.map(article => (
                        <li key={article.id} className="group flex items-center justify-between hover:bg-gray-800 rounded-md">
                          {renamingId === article.id ? (
                            <div className="flex-1 flex">
                              <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onBlur={() => handleRenameSubmit(article.id)}
                                onKeyPress={(e) => e.key === 'Enter' && handleRenameSubmit(article.id)}
                                className="flex-1 px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleArticleClick(article.id)}
                                className={`flex-1 text-left px-3 cursor-pointer py-2 truncate ${activeArticle?.id === article.id ? 'text-blue-400' : 'text-gray-300'}`}
                              >
                                {article.topic}
                              </button>
                              <ContentActionsDropdown
                                onDelete={() => handleDelete(article.id)}
                                onRename={() => {
                                  setRenamingId(article.id);
                                  setNewTitle(article.topic);
                                }}
                              />
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
              {isFetchingMore && (
                <div className="p-4 text-center text-gray-400">
                  Chargement...
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col border-b border-gray-700 items-center py-4 space-y-6">
            <button
              onClick={handleCreateArticle}
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