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
          <SparklesIcon className="h-10 w-10 mx-auto text-rose-500 mb-2" />
          <h2 className="text-4xl font-bold font-serif text-rose-700">AI Dessert Concierge</h2>
          <p className="text-rose-700/80 mt-2">
            Share your cravings and our AI will suggest the perfect treats from our kitchen.
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'tropical flavors for a party' or 'something chocolatey but light'"
            className="w-full px-5 py-3 border border-rose-200 rounded-full focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg disabled:bg-rose-200 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <SearchIcon className="h-6 w-6" />
            )}
          </button>
        </form>

        {isLoading && <p className="text-center text-rose-700/80">Whipping up the perfect suggestion...</p>}
        {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        
        {searched && !isLoading && !error && (
            <div>
                {recommendations.length > 0 ? (
                    <>
                        <h3 className="text-2xl font-bold font-serif text-center mb-8 text-rose-700">Here are our dessert recommendations for you:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {recommendations.map(book => (
                                <BookCard key={book.id} book={book} onSelectBook={onSelectBook} onAddToCart={onAddToCart}/>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-rose-700/80 bg-rose-50 border border-rose-100 p-4 rounded-md">
                        We couldn't find the perfect match just yet. Try different flavors or tell us more about your event!
                    </p>
                )}
            </div>
        )}
      </div>
    </section>
  );
};

export default BookRecommender;
