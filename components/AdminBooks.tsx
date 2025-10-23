
import React, { useState } from 'react';
import { useBookstore } from '../hooks/useBookstore';
import { Book } from '../types';
import BookFormModal from './BookFormModal';
import { PlusIcon, PencilIcon, TrashIcon } from './Icons';

interface AdminBooksProps {
    bookstore: ReturnType<typeof useBookstore>;
}

const AdminBooks: React.FC<AdminBooksProps> = ({ bookstore }) => {
    const { books, addBook, updateBook, deleteBook } = bookstore;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const handleOpenModal = (book: Book | null = null) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setEditingBook(null);
        setIsModalOpen(false);
    };

    const handleSaveBook = (bookData: Omit<Book, 'id'> | Book) => {
        if ('id' in bookData) {
            updateBook(bookData);
        } else {
            addBook(bookData);
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-serif">Manage Books</h2>
                <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add Book
                </button>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Title</th>
                            <th className="p-2">Author</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Stock</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} className="border-b hover:bg-stone-50">
                                <td className="p-2 font-medium">{book.title}</td>
                                <td className="p-2 text-stone-600">{book.author}</td>
                                <td className="p-2">${book.price.toFixed(2)}</td>
                                <td className="p-2">{book.stock}</td>
                                <td className="p-2">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(book)} className="text-stone-600 hover:text-teal-600"><PencilIcon className="h-5 w-5" /></button>
                                        <button onClick={() => window.confirm(`Delete ${book.title}?`) && deleteBook(book.id)} className="text-stone-600 hover:text-red-600"><TrashIcon className="h-5 w-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <BookFormModal
                    book={editingBook}
                    onClose={handleCloseModal}
                    onSave={handleSaveBook}
                />
            )}
        </div>
    );
};

export default AdminBooks;
