import React from 'react';

const BookCard = ({ book, onSelectBook, onAddToCart }) => {
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(book);
  };
    
  return (
    <div
      className="bg-white border border-rose-100 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col group"
      onClick={() => onSelectBook(book)}
    >
      <div className="relative">
        <img src={book.coverImage} alt={book.title} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white font-bold border-2 border-white rounded-full px-4 py-2">View Dessert</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-serif text-rose-700 truncate" title={book.title}>{book.title}</h3>
        <p className="text-rose-600 text-sm mt-1">{book.author}</p>
        {book.genre && (
            <span className="mt-3 inline-flex w-max items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-600">
                {book.genre}
            </span>
        )}
        <div className="mt-auto pt-4 flex justify-between items-center">
            <p className="text-lg font-bold text-rose-600">${book.price.toFixed(2)}</p>
            <button
                onClick={handleAddToCartClick}
                className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-bold py-2 px-3 rounded-full transition-colors duration-200"
                aria-label={`Add ${book.title} to cart`}
            >
                Add to Order
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
