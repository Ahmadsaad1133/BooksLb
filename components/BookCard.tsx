import React from 'react';

const BookCard = ({ book, onSelectBook, onAddToCart }) => {
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(book);
  };
    
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col group"
      onClick={() => onSelectBook(book)}
    >
      <div className="relative">
        <img src={book.coverImage} alt={book.title} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white font-bold border-2 border-white rounded-full px-4 py-2">View Details</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-serif truncate" title={book.title}>{book.title}</h3>
        <p className="text-stone-600 text-sm mt-1">{book.author}</p>
        <div className="mt-auto pt-4 flex justify-between items-center">
            <p className="text-lg font-bold text-teal-600">${book.price.toFixed(2)}</p>
            <button
                onClick={handleAddToCartClick}
                className="bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold py-2 px-3 rounded-full transition-colors duration-200"
                aria-label={`Add ${book.title} to cart`}
            >
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
