import React, { useState } from 'react';
import CollectionFormModal from './CollectionFormModal';
import { PlusIcon, PencilIcon, TrashIcon } from './Icons';

const AdminCollections = ({ bookstore }) => {
    const { collections, books, addCollection, updateCollection, deleteCollection } = bookstore;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    
    const handleOpenModal = (collection = null) => {
        setEditingCollection(collection);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingCollection(null);
        setIsModalOpen(false);
    };

    const handleSaveCollection = (collectionData) => {
        if ('id' in collectionData) {
            updateCollection(collectionData);
        } else {
            addCollection(collectionData);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-serif text-rose-700">Manage Collections</h2>
                 <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-rose-500 text-white font-bold rounded-md hover:bg-rose-400 flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add Collection
                </button>
            </div>
            <div className="space-y-4">
                {collections.map(collection => (
                    <div key={collection.id} className="p-4 border border-rose-100 rounded-lg flex justify-between items-center bg-white">
                        <div>
                            <h3 className="font-bold text-rose-700">{collection.name}</h3>
                            <p className="text-sm text-rose-600">{collection.bookIds?.length ?? 0} books</p>
                        </div>
                        <div className="flex gap-2">
                             <button onClick={() => handleOpenModal(collection)} className="text-rose-500 hover:text-rose-400"><PencilIcon className="h-5 w-5" /></button>
                             <button onClick={() => window.confirm(`Delete ${collection.name}?`) && deleteCollection(collection.id)} className="text-rose-400 hover:text-rose-600"><TrashIcon className="h-5 w-5" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <CollectionFormModal 
                    collection={editingCollection}
                    allBooks={books}
                    onClose={handleCloseModal}
                    onSave={handleSaveCollection}
                />
            )}
        </div>
    );
};

export default AdminCollections;
