import React, { useState } from 'react';
import { getGeminiBookRecommendations } from '../services/geminiService';
import BookCard from './BookCard';
import { SparklesIcon, SearchIcon } from './Icons';

const BookRecommender = ({ allBooks, onSelectBook, onAddToCart }) => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError(null);
    setSearched(true);
    setRecommendations([]);

    try {
      let apiKey = sessionStorage.getItem('gemini-api-key');
      if (!apiKey) {
        apiKey = window.prompt("Please enter your Google AI API Key to use the recommender.\n\nYou can get a free key from Google AI Studio.");
        if (!apiKey) {
          setError("API Key is required to get AI recommendations.");
          return;
        }
        sessionStorage.setItem('gemini-api-key', apiKey);
      }
      
      setIsLoading(true);
      const recommendedTitles = await getGeminiBookRecommendations(query, allBooks, apiKey);
      const recommendedBooks = allBooks.filter(book => 
        recommendedTitles.some(rec => rec.title === book.title)
      );
      setRecommendations(recommendedBooks);
    } catch (err) {
        if (err.message.includes("API Key is not valid")) {
            sessionStorage.removeItem('gemini-api-key'); // Clear invalid key
            setError("The API Key is not valid. Please refresh and try again with a valid key.");
        } else {
            setError(err.message);
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <SparklesIcon className="h-10 w-10 mx-auto text-teal-500 mb-2" />
          <h2 className="text-4xl font-bold font-serif">AI Book Recommender</h2>
          <p className="text-stone-600 mt-2">
            Tell us what you're in the mood for, and our AI will find the perfect book for you!
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'a fast-paced sci-fi thriller' or 'a cozy memoir'"
            className="w-full px-5 py-3 border border-stone-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <SearchIcon className="h-6 w-6" />
            )}
          </button>
        </form>

        {isLoading && <p className="text-center text-stone-600">Finding your next read...</p>}
        {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        
        {searched && !isLoading && !error && (
            <div>
                {recommendations.length > 0 ? (
                    <>
                        <h3 className="text-2xl font-bold font-serif text-center mb-8">Here are our recommendations for you:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {recommendations.map(book => (
                                <BookCard key={book.id} book={book} onSelectBook={onSelectBook} onAddToCart={onAddToCart}/>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-stone-600 bg-stone-100 p-4 rounded-md">
                        We couldn't find a perfect match in our current collection. Try a different search!
                    </p>
                )}
            </div>
        )}
      </div>
    </section>
  );
};

export default BookRecommender;
