// src/components/NewsFeed.jsx
import React, { useEffect, useState } from 'react';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://gnews.io/api/v4/search?q=inspiration+OR+hope&token=YOUR_API_KEY&lang=en'
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching the news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Positive News</h1>
      {loading ? (
        <p className="text-gray-600">Loading news...</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li key={index} className="border-b pb-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
                {article.title}
              </a>
              <p className="text-gray-700 mt-1">{article.description}</p>
              <p className="text-sm text-gray-500">Source: {article.source.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
