import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons.jsx';

const CollectionFormModal = ({ collection, allBooks, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState([]);

  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setSelectedBookIds(collection.bookIds);
    }
  }, [collection]);

  const handleBookToggle = (bookId) => {
    setSelectedBookIds(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const collectionData = { ...collection, name, bookIds: selectedBookIds };
    onSave(collectionData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-serif">{collection && 'id' in collection ? 'Edit Collection' : 'Add New Collection'}</h2>
            <button type="button" onClick={onClose} className="text-stone-500 hover:text-stone-800">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-stone-700 font-medium mb-1">Collection Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
          </div>
          <p className="text-stone-700 font-medium mb-2">Select Books</p>
          <div className="border rounded-md p-2 flex-grow overflow-y-auto">
            {allBooks.map(book => (
              <div key={book.id} className="flex items-center p-2 hover:bg-stone-100 rounded">
                <input
                  type="checkbox"
                  id={`book-${book.id}`}
                  checked={selectedBookIds.includes(book.id)}
                  onChange={() => handleBookToggle(book.id)}
                  className="h-4 w-4 text-teal-600 border-stone-300 rounded focus:ring-teal-500"
                />
                <label htmlFor={`book-${book.id}`} className="ml-3 text-sm text-stone-800">{book.title}</label>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <button type="button" onClick={onClose} className="px-6 py-2 mr-2 text-stone-700 rounded-md hover:bg-stone-100">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700">Save Collection</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionFormModal;
