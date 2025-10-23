
import { useState, useEffect, useMemo } from 'react';
import { Book, CartItem, Order, CustomerDetails, Collection, PageContent } from '../types';
import { INITIAL_BOOKS, INITIAL_COLLECTIONS, INITIAL_PAGE_CONTENT, OWNER_PASSWORD } from '../constants';

// Helper to get data from localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

// Helper to set data to localStorage
const setInStorage = <T>(key:string, value: T) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error writing to localStorage key “${key}”:`, error);
    }
};


export const useBookstore = () => {
    const [books, setBooks] = useState<Book[]>(() => getFromStorage('books', INITIAL_BOOKS));
    const [collections, setCollections] = useState<Collection[]>(() => getFromStorage('collections', INITIAL_COLLECTIONS));
    const [cart, setCart] = useState<CartItem[]>(() => getFromStorage('cart', []));
    const [orders, setOrders] = useState<Order[]>(() => getFromStorage('orders', []));
    const [pageContent, setPageContent] = useState<PageContent>(() => getFromStorage('pageContent', INITIAL_PAGE_CONTENT));
    const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => getFromStorage('isOwnerLoggedIn', false));

    // Persist state to localStorage on change
    useEffect(() => { setInStorage('books', books); }, [books]);
    useEffect(() => { setInStorage('collections', collections); }, [collections]);
    useEffect(() => { setInStorage('cart', cart); }, [cart]);
    useEffect(() => { setInStorage('orders', orders); }, [orders]);
    useEffect(() => { setInStorage('pageContent', pageContent); }, [pageContent]);
    useEffect(() => { setInStorage('isOwnerLoggedIn', isOwnerLoggedIn); }, [isOwnerLoggedIn]);

    // Cart management
    const addToCart = (book: Book, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === book.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...book, quantity }];
        });
    };

    const updateCartQuantity = (bookId: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(bookId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item => (item.id === bookId ? { ...item, quantity } : item))
        );
    };

    const removeFromCart = (bookId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== bookId));
    };

    const clearCart = () => {
        setCart([]);
    };
    
    const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

    // Order management
    const placeOrder = (customer: CustomerDetails): Order => {
        const newOrder: Order = {
            id: `order_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`,
            customer,
            items: cart,
            total: cartTotal,
            date: new Date().toISOString(),
            status: 'Pending',
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);
        clearCart();
        return newOrder;
    };
    
    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
    };

    // Auth management
    const login = (password: string): boolean => {
        if (password === OWNER_PASSWORD) {
            setIsOwnerLoggedIn(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsOwnerLoggedIn(false);
    };

    // Admin - Book management
    const addBook = (book: Omit<Book, 'id'>) => {
        setBooks(prev => [...prev, { ...book, id: Date.now() }]);
    };
    
    const updateBook = (updatedBook: Book) => {
        setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
    };

    const deleteBook = (bookId: number) => {
        setBooks(prev => prev.filter(b => b.id !== bookId));
    };

    // Admin - Collection management
    const addCollection = (collection: Omit<Collection, 'id'>) => {
        setCollections(prev => [...prev, { ...collection, id: Date.now() }]);
    };

    const updateCollection = (updatedCollection: Collection) => {
        setCollections(prev => prev.map(c => c.id === updatedCollection.id ? updatedCollection : c));
    };

    const deleteCollection = (collectionId: number) => {
        setCollections(prev => prev.filter(c => c.id !== collectionId));
    };

    // Admin - Page Content management
    const updatePageContent = (newContent: PageContent) => {
        setPageContent(newContent);
    };

    return {
        // State
        books,
        collections,
        cart,
        orders,
        pageContent,
        isOwnerLoggedIn,
        cartCount,
        cartTotal,

        // Actions
        addToCart,
        updateCartQuantity,
        removeFromCart,
        placeOrder,
        login,
        logout,

        // Admin Actions
        addBook,
        updateBook,
        deleteBook,
        addCollection,
        updateCollection,
        deleteCollection,
        updatePageContent,
        updateOrderStatus,
    };
};
