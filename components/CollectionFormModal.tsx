import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';

const CollectionFormModal = ({ collection, allBooks, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState([]);

  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setSelectedBookIds((collection.bookIds ?? []).map(id => String(id)));
    } else {
      setName('');
      setSelectedBookIds([]);
    }
  }, [collection]);

  const handleBookToggle = (bookId) => {
    const id = String(bookId);
    setSelectedBookIds(prev =>
      prev.includes(id) ? prev.filter(existingId => existingId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const collectionData = { ...collection, name, bookIds: selectedBookIds };
    onSave(collectionData);
    onClose();
  };

  return (
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-rose-100" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-serif text-rose-700">{collection && 'id' in collection ? 'Edit Assortment' : 'Add New Assortment'}</h2>
            <button type="button" onClick={onClose} className="text-rose-400 hover:text-rose-600">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-rose-700 font-medium mb-1">Assortment Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400" />
          </div>
          <p className="text-rose-700 font-medium mb-2">Select Desserts</p>
          <div className="border border-rose-100 rounded-md p-2 flex-grow overflow-y-auto">
            {allBooks.map(book => (
              <div key={book.id} className="flex items-center p-2 hover:bg-rose-50 rounded">
                <input
                  type="checkbox"
                  id={`book-${book.id}`}
                  checked={selectedBookIds.includes(String(book.id))}
                  onChange={() => handleBookToggle(book.id)}
                  className="h-4 w-4 text-rose-500 border-rose-200 rounded focus:ring-rose-400"
                />
                <label htmlFor={`book-${book.id}`} className="ml-3 text-sm text-rose-700">{book.title}</label>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <button type="button" onClick={onClose} className="px-6 py-2 mr-2 text-rose-600 rounded-md hover:bg-rose-50">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-rose-500 text-white font-bold rounded-md hover:bg-rose-400">Save Assortment</button>
          </div>
        </form>
      </div>
  );
};

export default CollectionFormModal;
