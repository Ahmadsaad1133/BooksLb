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
                <h2 className="text-2xl font-bold font-serif">Manage Collections</h2>
                 <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add Collection
                </button>
            </div>
            <div className="space-y-4">
                {collections.map(collection => (
                    <div key={collection.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{collection.name}</h3>
                            <p className="text-sm text-stone-600">{collection.bookIds.length} books</p>
                        </div>
                        <div className="flex gap-2">
                             <button onClick={() => handleOpenModal(collection)} className="text-stone-600 hover:text-teal-600"><PencilIcon className="h-5 w-5" /></button>
                             <button onClick={() => window.confirm(`Delete ${collection.name}?`) && deleteCollection(collection.id)} className="text-stone-600 hover:text-red-600"><TrashIcon className="h-5 w-5" /></button>
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
