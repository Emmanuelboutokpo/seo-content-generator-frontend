"use client"

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { AppDispatch, RootState } from '@/app/lib/store';
import { createArticle, fetchArticle, fetchInitialArticles, } from '../lib/features/articleSlice';

export default function Main() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ topic: "" });
  const [isCreating, setIsCreating] = useState(false);
  const { topic } = formData;

  // Accès à l'état de création depuis Redux si nécessaire
  const { isLoading, error } = useSelector((state: RootState) => state.art);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
  
    setIsCreating(true);
    try {
      const result = await dispatch(createArticle(topic)).unwrap();
      router.push(`/dashboard/${result?.id}`)
    } catch (error) {
      console.error('Erreur détaillée:', error);
    } finally {
      setIsCreating(false);
    }
    setFormData({topic:""})
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl text-white font-bold mb-4">SEO CONTENT GENERATOR</h1>
            <p className="text-gray-400 mb-8">Please enter your topic</p>
            
            {error && (
              <div className="mb-4 p-2 text-red-500 bg-red-100 rounded">
                {typeof error === 'string' ? error : 'An error occurred'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  placeholder="Enter your topic..."
                  className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isCreating}
                />
                <button
                  type="submit"
                  disabled={!topic.trim() || isCreating}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              {isCreating && (
                <p className="text-gray-400">Generating content, please wait...</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}