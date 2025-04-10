"use client"

import { useState, useEffect } from 'react';
import { Article } from '../types/articles';

export default function ArticleEditor({
  article,
  onSave
}: {
  article: Article;
  onSave: (updates: Partial<Article>) => void;
}) {
  const [formData, setFormData] = useState({
    topic: article.topic,
    content: article.content
  });

  useEffect(() => {
    setFormData({
      topic: article.topic,
      content: article.content
    });
  }, [article]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) => setFormData({...formData, topic: e.target.value})}
          className="w-full text-2xl font-bold mb-4 p-2 border-b"
          placeholder="Article topic"
        />
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="w-full h-96 p-2 border rounded"
          placeholder="Write your content here..."
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}