"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';
import type { AppDispatch, RootState } from '@/app/lib/store';
import { 
  fetchArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  setActiveArticle
} from '../../lib/features/articleSlice';

export default function Main() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sélection des états depuis Redux
  const {
    activeArticle,
    isLoading,
    error
  } = useSelector((state: RootState) => state.art);

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [message, setMessage] = useState('');

  // Charger l'article lorsque l'ID change
  useEffect(() => {
    const loadArticle = async () => {
      if (id) {
        try {
          await dispatch(fetchArticle(id as string)).unwrap();
        } catch (err) {
          console.error("Failed to load article:", err);
        }
      } else {
        resetForm();
      }
    };

    loadArticle();
  }, [id, dispatch]);

  // Mettre à jour le formData quand activeArticle change
  useEffect(() => {
    if (activeArticle) {
      setFormData({
        title: activeArticle.topic,
        content: activeArticle.content || ''
      });
    }
  }, [activeArticle]);

  const resetForm = () => {
    setFormData({ title: '', content: '' });
    setMessage('');
    dispatch(setActiveArticle(null));
  };

  // Auto-scroll vers le bas
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [formData.content, scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    try {
      if (activeArticle) {
        // Mise à jour de l'article existant
        await dispatch(updateArticle({
          id: activeArticle.id,
          updates: {
            topic: formData.title,
            content: formData.content
          }
        })).unwrap();
      } else {
        // Création d'un nouvel article
        const result = await dispatch(createArticle(formData.title)).unwrap();
        //router.push(`/dashboard/${result.id}`);
      }
    } catch (err) {
      console.error("Error saving article:", err);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${message}` : message
    }));
    setMessage('');
  };

  const handleDeleteArticle = async () => {
    if (!activeArticle) return;
    
    try {
      await dispatch(deleteArticle(activeArticle.id)).unwrap();
      router.push('/dashboard');
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  if (isLoading && !activeArticle && id) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (id && !activeArticle) {
    return (
      <div className="flex h-screen  bg-black items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Article not found</h2>
          <button 
            onClick={() => router.push('/dashboard/')}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">SEO CONTENT GENERATOR</h1>
            <p className="text-gray-600 mb-8">Please enter your topic</p>
            
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Type your topic..."
                  className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-black">
      {/* Header avec titre et boutons */}
      <div className="sticky top-0 z-10 p-4 bg-black shadow-sm">
        <h2 className="text-xl text-center font-semibold">
          {formData.title}
        </h2>
      </div>

      {/* Zone de contenu éditable */}
      <div className="flex-1 overflow-y-auto p-4">
  <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow p-6">
    <div className="prose prose-invert lg:prose-xl max-w-none min-h-[60vh]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return  match ? (
              <div className="relative my-4">
                <div className="absolute right-2 top-1 text-xs text-white font-mono bg-gray-800 px-2 py-1 rounded">
                  {match[1]}
                </div>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-auto">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-800 text-white px-1 rounded" {...props}>
                {children}
              </code>
            );
          },
          img({node, ...props}) {
            return (
              <img
                {...props}
                className="mx-auto my-4 rounded shadow-lg max-h-96 object-contain"
              />
            );
          }
        }}
      >
        {formData.content}
      </ReactMarkdown>
      <div ref={messagesEndRef} />
    </div>
  </div>
</div>


      {/* Input pour ajouter du contenu */}
      <div className="sticky bottom-0 p-4 bg-black shadow-inner">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus={!!activeArticle}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:text-gray-400"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}