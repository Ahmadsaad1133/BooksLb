import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import FeaturedBooks from './components/FeaturedBooks.jsx';
import AboutSection from './components/AboutSection.jsx';
import ContactForm from './components/ContactForm.jsx';
import BookDetailModal from './components/BookDetailModal.jsx';
import CartView from './components/CartView.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import LoginModal from './components/LoginModal.jsx';
import BookRecommender from './components/BookRecommender.jsx';
import { useBookstore } from './hooks/useBookstore.js';

const App = () => {
    const bookstore = useBookstore();
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedBook, setSelectedBook] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);

    const featuredCollection = bookstore.collections.find(c => c.name === "Bestsellers");
    const featuredBooks = bookstore.books.filter(b => featuredCollection?.bookIds.includes(b.id));

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
                            title="Bestsellers" 
                            books={featuredBooks} 
                            onSelectBook={handleSelectBook} 
                            onAddToCart={handleAddToCart}
                        />
                        <BookRecommender 
                            allBooks={bookstore.books}
                            onSelectBook={handleSelectBook}
                            onAddToCart={handleAddToCart}
                        />
                        <AboutSection content={bookstore.pageContent.aboutContent} />
                        <ContactForm />
                    </>
                );
            case 'books':
                 return (
                    <div className="container mx-auto px-6 py-12">
                        <FeaturedBooks 
                            title="All Books" 
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
        <div className="font-sans bg-stone-50 text-stone-900">
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
