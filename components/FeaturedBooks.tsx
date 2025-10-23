
import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';

interface FeaturedBooksProps {
  title: string;
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ title, books, onSelectBook, onAddToCart }) => {
  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10 font-serif">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map(book => (
            <BookCard 
                key={book.id} 
                book={book} 
                onSelectBook={onSelectBook}
                onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
