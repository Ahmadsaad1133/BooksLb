import React, { useState } from 'react';
import BookFormModal from './BookFormModal';
import { PlusIcon, PencilIcon, TrashIcon } from './Icons';

const AdminBooks = ({ bookstore }) => {
    const { books, addBook, updateBook, deleteBook } = bookstore;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const handleOpenModal = (book = null) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setEditingBook(null);
        setIsModalOpen(false);
    };

    const handleSaveBook = async (bookData) => {
        if ('id' in bookData) {
            await updateBook(bookData);
        } else {
            await addBook(bookData);
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-serif text-rose-700">Manage Desserts</h2>
                <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-rose-500 text-white font-bold rounded-md hover:bg-rose-400 flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add Dessert
                </button>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-rose-100">
                            <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Dessert</th>
                            <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Flavor Notes</th>
                            <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Price</th>
                            <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Stock</th>
                            <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} className="border-b border-rose-100 hover:bg-rose-50">
                                <td className="p-2 font-medium text-rose-700">{book.title}</td>
                                <td className="p-2 text-rose-600">{book.author}</td>
                                <td className="p-2 text-rose-700">${book.price.toFixed(2)}</td>
                                <td className="p-2 text-rose-700">{book.stock}</td>
                                <td className="p-2">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(book)} className="text-rose-500 hover:text-rose-400"><PencilIcon className="h-5 w-5" /></button>
                                        <button
                                            onClick={async () => {
                                                if (window.confirm(`Delete ${book.title}?`)) {
                                                    await deleteBook(book.id);
                                                }
                                            }}
                                            className="text-rose-400 hover:text-rose-600"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
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
