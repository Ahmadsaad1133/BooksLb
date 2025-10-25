import React, { useState } from 'react';
import AdminBooks from './AdminBooks';
import AdminCollections from './AdminCollections';
import AdminOrders from './AdminOrders';
import AdminPageContent from './AdminPageContent';

const AdminDashboard = ({ bookstore }) => {
    const [activeTab, setActiveTab] = useState('orders');
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'books':
                return <AdminBooks bookstore={bookstore} />;
            case 'collections':
                return <AdminCollections bookstore={bookstore} />;
            case 'orders':
                return <AdminOrders bookstore={bookstore} />;
            case 'content':
                return <AdminPageContent bookstore={bookstore} />;
            default:
                return <div>Select a tab</div>;
        }
    };
    
    const getTabClass = (tabName) => {
        return `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tabName
                ? 'bg-rose-500 text-white shadow'
                : 'text-rose-700 hover:bg-rose-100'
        }`;
    };

    return (
        <div className="bg-rose-50 min-h-screen">
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold font-serif mb-6 text-rose-700">Deli Postres Admin</h1>
                <div className="bg-white rounded-lg shadow-lg p-4 mb-6 border border-rose-100">
                    <nav className="flex flex-wrap gap-2">
                        <button onClick={() => setActiveTab('orders')} className={getTabClass('orders')}>Orders</button>
                        <button onClick={() => setActiveTab('books')} className={getTabClass('books')}>Desserts</button>
                        <button onClick={() => setActiveTab('collections')} className={getTabClass('collections')}>Assortments</button>
                        <button onClick={() => setActiveTab('content')} className={getTabClass('content')}>Page Content</button>
                    </nav>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 border border-rose-100">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
