import React, { useState } from 'react';
import { XIcon } from './Icons';

const BookDetailModal = ({ book, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(book, quantity);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition z-10"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="w-full md:w-1/3">
            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"/>
        </div>
        <div className="p-8 w-full md:w-2/3 flex flex-col">
          <h2 className="text-4xl font-bold font-serif text-rose-700 mb-2">{book.title}</h2>
          <p className="text-lg text-rose-600 mb-4">{book.author}</p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-2xl font-bold text-rose-600">${book.price.toFixed(2)}</span>
            <span className="bg-rose-100 text-rose-700 text-sm font-medium px-3 py-1 rounded-full">Category: {book.genre}</span>
          </div>
          <p className="text-stone-700 leading-relaxed mb-6 flex-grow">{book.description}</p>
          <p className="text-sm text-rose-700/80 mb-6">Allergens: {book.publisher}</p>
           <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                className="w-20 px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                onClick={handleAddToCart}
                className="flex-grow px-8 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg"
              >
                Add to Order
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
