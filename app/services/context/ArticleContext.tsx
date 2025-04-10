"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/utils/api';

// Types
export interface Article {
  id: string;
  topic: string;
  content: string;
  created_at: string;
  updated_at: string;
}


interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

interface ArticleContextState {
  articles: Article[];
  activeArticle: Article | null;
  isLoading: boolean;
  error: string | null;
}

interface ArticleContextType extends ArticleContextState {
  fetchArticles: () => Promise<void>;
  fetchArticle: (id: string) => Promise<Article>;
  createArticle: (topic: string) => Promise<Article>;
  updateArticle: (id: string, data: Partial<Article>) => Promise<Article>;
  deleteArticle: (id: string) => Promise<void>;
  setActiveArticle: (id: string | null) => void;
}

function toApiError(error: unknown): string {
  if (error instanceof Error) {
    const axiosError = error as any;
    return axiosError.response?.data?.detail || error.message;
  }
  return 'Erreur inconnue';
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    articles: Article[];
    activeArticle: Article | null;
    isLoading: boolean;
    error: string | null;
  }>({
    articles: [],
    activeArticle: null,
    isLoading: false,
    error: null
  });

  const router = useRouter();

  // Helper pour gérer les états
  const setLoading = (isLoading: boolean) => 
    setState(prev => ({ ...prev, isLoading }));

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Article[]>('/articles/');
      console.log(data);
      setState(prev => ({ 
        ...prev, 
        articles: data, 
        error: null // Bien typé comme string | null
      }));
      
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        error: toApiError(err) // Retourne bien un string
      }));
    } finally {
      setLoading(false);
    }
  };

  const fetchArticle = async (id: string): Promise<Article> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { data } = await api.get<Article>(`/articles/${id}/`);
      setState(prev => ({ ...prev, activeArticle: data, error: null }));
      return data;
    } catch (err) {
      const error = toApiError(err);
      setState(prev => ({ ...prev, error }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const createArticle = async (topic: string): Promise<Article> => {
    console.log(topic);
    
    setLoading(true);
    try {
      const { data } = await api.post<Article>('/articles/', { topic });
      setState(prev => ({
        ...prev,
        articles: [...prev.articles, data],
        activeArticle: data
      }));
      return data;
    } catch (err) {
      const error = toApiError(err);
      setState(prev => ({ ...prev, error }));
      throw error;
    }  finally {
      setLoading(false);
    }
  };

  const updateArticle = async (
    id: string,
    updates: Partial<Omit<Article, 'id'>>
  ): Promise<Article> => {
    setLoading(true);
    try {
      const { data } = await api.patch<Article>(`/articles/${id}/`, updates);
      setState(prev => ({
        ...prev,
        articles: prev.articles.map(a => a.id === id ? data : a),
        activeArticle: prev.activeArticle?.id === id ? data : prev.activeArticle,
        error: null
      }));
      return data;
    }catch (err) {
      const error = toApiError(err);
      setState(prev => ({ ...prev, error }));
      throw error;
    }  finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await api.delete(`/articles/${id}/`);
      setState(prev => ({
        ...prev,
        articles: prev.articles.filter(a => a.id !== id),
        activeArticle: prev.activeArticle?.id === id ? null : prev.activeArticle,
        error: null
      }));
    } catch (err) {
      const error = toApiError(err);
      setState(prev => ({ ...prev, error }));
      throw error;
    }  finally {
      setLoading(false);
    }
  };

  const setActiveArticle = (id: string | null) => {
    if (!id) {
      setState(prev => ({ ...prev, activeArticle: null }));
      router.push('/dashboard');
      return;
    }

    const article = state.articles.find(a => a.id === id);
    if (article) {
      setState(prev => ({ ...prev, activeArticle: article }));
      router.push(`/dashboard/${id}`);
    } else {
      fetchArticle(id).then(() => router.push(`/dashboard/${id}`));
    }
  };

  // Charge les articles au montage
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticleContext.Provider
      value={{
        articles: state.articles,
        activeArticle: state.activeArticle,
        isLoading: state.isLoading,
        error: state.error,
        fetchArticles,
        fetchArticle,
        createArticle,
        updateArticle,
        deleteArticle,
        setActiveArticle
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export const useArticles = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error('useArticles must be used within ArticleProvider');
  return context;
};