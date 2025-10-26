import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedBooks from './components/FeaturedBooks';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import BookDetailModal from './components/BookDetailModal';
import CartView from './components/CartView';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';
import CollectionsShowcase from './components/CollectionsShowcase';
import { useBookstore } from './hooks/useBookstore';

const App = () => {
    const bookstore = useBookstore();
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedBook, setSelectedBook] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);
    if (!bookstore.isHydrated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-rose-50 text-rose-900">
                <div className="text-center">
                    <p className="text-xl font-semibold">Loading bakery delights…</p>
                </div>
            </div>
        );
    }

    const featuredCollection = bookstore.collections.find((collection) => (collection.bookIds?.length ?? 0) > 0);
    const featuredIds = new Set((featuredCollection?.bookIds ?? []).map(id => String(id)));
    const featuredBooks = featuredIds.size
        ? bookstore.books.filter(b => featuredIds.has(String(b.id)))
        : bookstore.books.slice(0, 4);
    const featuredTitle = featuredCollection?.name ?? 'Featured Desserts';
    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleAddToCart = (book, quantity = 1) => {
        bookstore.addToCart(book, quantity);
    };

    const handlePlaceOrder = (customerDetails) => {
        const order = bookstore.placeOrder(customerDetails);
        setLastOrder(order);
        setCurrentPage('confirmation');
    };
    
    const handleLogin = (password) => {
        const success = bookstore.login(password);
        if (success) {
            setIsLoginModalOpen(false);
            setCurrentPage('admin');
        }
        return success;
    };
    
    const handleLogout = () => {
        bookstore.logout();
        setCurrentPage('home');
    };

    useEffect(() => {
        // If owner logs out from admin page, redirect to home
        if (!bookstore.isOwnerLoggedIn && currentPage === 'admin') {
            setCurrentPage('home');
        }
    }, [bookstore.isOwnerLoggedIn, currentPage]);

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        <Hero 
                            title={bookstore.pageContent.heroTitle}
                            subtitle={bookstore.pageContent.heroSubtitle}
                            image={bookstore.pageContent.heroImage}
                            onShopNow={() => setCurrentPage('books')}
                        />
                        <FeaturedBooks
                            title={featuredTitle}
                            books={featuredBooks}
                            onSelectBook={handleSelectBook}
                            onAddToCart={handleAddToCart}
                        />
                        <CollectionsShowcase
                            collections={bookstore.collections.filter((collection) => (collection.bookIds?.length ?? 0) > 0)}
                            books={bookstore.books}
                            onExploreCollection={() => setCurrentPage('books')}
                        />
                        <AboutSection content={bookstore.pageContent.aboutContent} />
                        <ContactForm />
                    </>
                );
            case 'books':
                 return (
                    <div className="container mx-auto px-6 py-12">
                        <FeaturedBooks
                            title="All Desserts"
                            books={bookstore.books}
                            onSelectBook={handleSelectBook}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                );
            case 'about':
                return <AboutSection content={bookstore.pageContent.aboutContent} />;
            case 'contact':
                return <ContactForm />;
            case 'cart':
                return <CartView 
                    cartItems={bookstore.cart}
                    cartTotal={bookstore.cartTotal}
                    onUpdateQuantity={bookstore.updateCartQuantity}
                    onRemoveItem={bookstore.removeFromCart}
                    onCheckout={() => setCurrentPage('checkout')}
                    onContinueShopping={() => setCurrentPage('books')}
                />;
            case 'checkout':
                return <CheckoutForm
                    cartItems={bookstore.cart}
                    cartTotal={bookstore.cartTotal}
                    onPlaceOrder={handlePlaceOrder}
                />;
            case 'confirmation':
                return <OrderConfirmation 
                    lastOrder={lastOrder}
                    onBackToStore={() => setCurrentPage('home')}
                />;
            case 'admin':
                return bookstore.isOwnerLoggedIn ? 
                    <AdminDashboard bookstore={bookstore} /> :
                    <p className="text-center py-20">You must be logged in to view this page.</p>;
            default:
                return <div>Page not found</div>;
        }
    };
    
    return (
        <div className="font-sans bg-rose-50 text-rose-950">
            <Header
                onHomeClick={() => setCurrentPage('home')}
                onBooksClick={() => setCurrentPage('books')}
                onAboutClick={() => setCurrentPage('about')}
                onContactClick={() => setCurrentPage('contact')}
                onCartClick={() => setCurrentPage('cart')}
                onLoginClick={() => setIsLoginModalOpen(true)}
                onLogoutClick={handleLogout}
                onAdminClick={() => setCurrentPage('admin')}
                cartCount={bookstore.cartCount}
                isOwnerLoggedIn={bookstore.isOwnerLoggedIn}
                logoImage={bookstore.pageContent.logoImage}
            />
            
            <main>
                {renderContent()}
            </main>
            
            { currentPage !== 'cart' && currentPage !== 'checkout' && currentPage !== 'confirmation' && currentPage !== 'admin' && <Footer />}

            {selectedBook && (
                <BookDetailModal 
                    book={selectedBook} 
                    onClose={() => setSelectedBook(null)}
                    onAddToCart={handleAddToCart}
                />
            )}

            {isLoginModalOpen && (
                <LoginModal
                    onClose={() => setIsLoginModalOpen(false)}
                    onLogin={handleLogin}
                />
            )}
        </div>
    );
};

export default App;
