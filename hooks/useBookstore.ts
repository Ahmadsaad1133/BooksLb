import { useState, useEffect, useMemo, useRef } from 'react';
import { INITIAL_BOOKS, INITIAL_COLLECTIONS, INITIAL_PAGE_CONTENT, OWNER_PASSWORD } from '../constants';
import type { Book, BookInput } from '../types';
import {
    addBook as addBookToFirestore,
    updateBook as updateBookInFirestore,
    deleteBook as deleteBookFromFirestore,
    fetchBooks as fetchBooksFromFirestore,
    subscribeToBooks,
    seedBook as seedBookInFirestore,
} from '../services/firebase';

// Helper to get data from localStorage
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
        console.warn(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

// Helper to set data to localStorage
const setInStorage = (key: string, value: unknown) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error writing to localStorage key “${key}”:`, error);
    }
};
const normalizeBook = (book: Book): Book => ({
    ...book,
    id: String(book.id),
});

const initialBooks: Book[] = INITIAL_BOOKS.map((book) => normalizeBook(book as Book));

const normalizeCollection = <T extends { bookIds?: Array<string | number> }>(collection: T) => ({
    ...collection,
    bookIds: (collection.bookIds ?? []).map((id) => String(id)),
});

const normalizeCartItem = <T extends { id: string | number }>(item: T) => ({
    ...item,
    id: String(item.id),
});

const normalizeOrder = <T extends { items?: Array<{ id: string | number }> }>(order: T) => ({
    ...order,
    items: (order.items ?? []).map((item) => normalizeCartItem(item)),
});
export const useBookstore = () => {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [collections, setCollections] = useState(() =>
        getFromStorage('collections', INITIAL_COLLECTIONS).map((collection) => normalizeCollection(collection)),
    );
    const [cart, setCart] = useState(() =>
        getFromStorage('cart', []).map((item: { id: string | number }) => normalizeCartItem(item)),
    );
    const [orders, setOrders] = useState(() =>
        getFromStorage('orders', []).map((order: { items?: Array<{ id: string | number }> }) => normalizeOrder(order)),
    );
    const [pageContent, setPageContent] = useState(() => getFromStorage('pageContent', INITIAL_PAGE_CONTENT));
    const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(() => getFromStorage('isOwnerLoggedIn', false));
    const hasSeededRef = useRef(false);
    // Persist state to localStorage on change
    useEffect(() => { setInStorage('collections', collections); }, [collections]);
    useEffect(() => { setInStorage('cart', cart); }, [cart]);
    useEffect(() => { setInStorage('orders', orders); }, [orders]);
    useEffect(() => { setInStorage('pageContent', pageContent); }, [pageContent]);
    useEffect(() => { setInStorage('isOwnerLoggedIn', isOwnerLoggedIn); }, [isOwnerLoggedIn]);
    // Sync books with Firestore
    useEffect(() => {
        const unsubscribe = subscribeToBooks(
            (bookList) => {
                if (bookList.length > 0) {
                    setBooks(bookList.map((book) => normalizeBook(book)));
                } else if (!hasSeededRef.current) {
                    setBooks(initialBooks);
                } else {
                    setBooks([]);
                }
            },
            (error) => {
                console.error('Failed to subscribe to Firestore books:', error);
            },
        );

        (async () => {
            try {
                const existingBooks = await fetchBooksFromFirestore();
                if (existingBooks.length === 0) {
                    await Promise.all(initialBooks.map((book) => seedBookInFirestore(book)));
                }
                hasSeededRef.current = true;
            } catch (error) {
                console.error('Failed to initialize Firestore data:', error);
            }
        })();

        return () => {
            unsubscribe();
        };
    }, []);
    // Cart management
    const addToCart = (book, quantity = 1) => {
        const normalizedBook = normalizeCartItem({ ...book });
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === normalizedBook.id);
            if (existingItem) {
                return prevCart.map(item =>
                  item.id === normalizedBook.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...normalizedBook, quantity }];
        });
    };

    const updateCartQuantity = (bookId, quantity) => {
        if (quantity < 1) {
            removeFromCart(bookId);
            return;
        }
        const id = String(bookId);
        setCart(prevCart =>
            prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const removeFromCart = (bookId) => {
        const id = String(bookId);
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };
    
    const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

    // Order management
    const placeOrder = (customer) => {
        const newOrder = {
            id: `order_${new Date().getTime()}_${Math.random().toString(36).slice(2, 11)}`,
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
    
    const updateOrderStatus = (orderId, status) => {
        setOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
    };

    // Auth management
    const login = (password) => {
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
    const addBook = async (book: BookInput) => {
        await addBookToFirestore({
            ...book,
            price: Number(book.price),
            stock: Number(book.stock),
        });
    };
    
    const updateBook = async (updatedBook: Book) => {
        await updateBookInFirestore({
            ...updatedBook,
            id: String(updatedBook.id),
            price: Number(updatedBook.price),
            stock: Number(updatedBook.stock),
        });
    };

    const deleteBook = async (bookId: string | number) => {
        await deleteBookFromFirestore(bookId);
    };

    // Admin - Collection management
    const addCollection = (collection) => {
        const normalized = {
            ...collection,
            id: Date.now(),
            bookIds: (collection.bookIds ?? []).map(id => String(id)),
        };
        setCollections(prev => [...prev, normalized]);
    };

    const updateCollection = (updatedCollection) => {
        const normalized = {
            ...updatedCollection,
            bookIds: (updatedCollection.bookIds ?? []).map(id => String(id)),
        };
        setCollections(prev => prev.map(c => c.id === normalized.id ? normalized : c));
    };

    const deleteCollection = (collectionId) => {
        setCollections(prev => prev.filter(c => c.id !== collectionId));
    };

    // Admin - Page Content management
    const updatePageContent = (newContent) => {
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
