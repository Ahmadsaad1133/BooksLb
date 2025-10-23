
import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { XIcon } from './Icons';
import { toBase64 } from '../utils/imageUtils';

interface BookFormModalProps {
  book: Omit<Book, 'id'> | Book | null;
  onClose: () => void;
  onSave: (book: Omit<Book, 'id'> | Book) => void;
}

const emptyBook: Omit<Book, 'id'> = {
    title: '',
    author: '',
    description: '',
    price: 0,
    coverImage: '',
    genre: '',
    publisher: '',
    stock: 0,
};

const BookFormModal: React.FC<BookFormModalProps> = ({ book, onClose, onSave }) => {
  const [formData, setFormData] = useState(book || emptyBook);
  const [coverPreview, setCoverPreview] = useState<string | null>(book?.coverImage || null);

  useEffect(() => {
    if (book) {
      setFormData(book);
      setCoverPreview(book.coverImage);
    } else {
      setFormData(emptyBook);
      setCoverPreview(null);
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await toBase64(file);
      setFormData(prev => ({ ...prev, coverImage: base64 }));
      setCoverPreview(base64);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8 flex-grow overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-serif">{book && 'id' in book ? 'Edit Book' : 'Add New Book'}</h2>
              <button type="button" onClick={onClose} className="text-stone-500 hover:text-stone-800">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-stone-700 font-medium mb-1">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-stone-700 font-medium mb-1">Author</label>
                    <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
                 <div className="mb-4">
                    <label htmlFor="genre" className="block text-stone-700 font-medium mb-1">Genre</label>
                    <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="publisher" className="block text-stone-700 font-medium mb-1">Publisher</label>
                    <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-stone-700 font-medium mb-1">Price</label>
                    <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
                 <div className="mb-4">
                    <label htmlFor="stock" className="block text-stone-700 font-medium mb-1">Stock</label>
                    <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-stone-700 font-medium mb-1">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required className="w-full px-4 py-2 border border-stone-300 rounded-md" />
            </div>

            <div className="mb-4">
                <label className="block text-stone-700 font-medium mb-1">Cover Image</label>
                <input type="file" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                {coverPreview && <img src={coverPreview} alt="Cover preview" className="mt-4 h-32 w-auto object-contain rounded"/>}
            </div>

            <div className="mt-8 text-right">
                <button type="button" onClick={onClose} className="px-6 py-2 mr-2 text-stone-700 rounded-md hover:bg-stone-100">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700">Save Book</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
