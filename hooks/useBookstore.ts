import { useState, useEffect, useMemo, useRef } from 'react';
import { INITIAL_BOOKS, INITIAL_COLLECTIONS, INITIAL_PAGE_CONTENT, OWNER_PASSWORD } from '../constants';
import type { Book, BookInput, PageContent } from '../types';
import {
    addBook as addBookToFirestore,
    updateBook as updateBookInFirestore,
    deleteBook as deleteBookFromFirestore,
    fetchBooks as fetchBooksFromFirestore,
    subscribeToBooks,
    seedBook as seedBookInFirestore,
    fetchPageContent as fetchPageContentFromFirestore,
    subscribeToPageContent,
    savePageContent as savePageContentToFirestore,
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
const BOOKS_STORAGE_KEY = 'books';
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
    const [books, setBooks] = useState<Book[]>(() => {
        const storedBooks = getFromStorage<Book[]>(BOOKS_STORAGE_KEY, initialBooks);
        return storedBooks.map((book) => normalizeBook(book as Book));
    });
    const [collections, setCollections] = useState(() =>
        getFromStorage('collections', INITIAL_COLLECTIONS).map((collection) => normalizeCollection(collection)),
    );
    const [cart, setCart] = useState(() =>
        getFromStorage('cart', []).map((item: { id: string | number }) => normalizeCartItem(item)),
    );
    const [orders, setOrders] = useState(() =>
        getFromStorage('orders', []).map((order: { items?: Array<{ id: string | number }> }) => normalizeOrder(order)),
    );
    const [pageContent, setPageContent] = useState<PageContent>(() => getFromStorage('pageContent', INITIAL_PAGE_CONTENT));
    const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(() => getFromStorage('isOwnerLoggedIn', false));
    const hasSeededRef = useRef(false);
    const previousPageContentRef = useRef<PageContent | null>(null);
    // Persist state to localStorage on change
    useEffect(() => { setInStorage(BOOKS_STORAGE_KEY, books); }, [books]);
    useEffect(() => { setInStorage('collections', collections); }, [collections]);
    useEffect(() => { setInStorage('cart', cart); }, [cart]);
    useEffect(() => { setInStorage('orders', orders); }, [orders]);
    useEffect(() => { setInStorage('pageContent', pageContent); }, [pageContent]);
    useEffect(() => { setInStorage('isOwnerLoggedIn', isOwnerLoggedIn); }, [isOwnerLoggedIn]);
    useEffect(() => {
        let unsubscribe: ReturnType<typeof subscribeToPageContent> | undefined;

        try {
            unsubscribe = subscribeToPageContent(
                (content) => {
                    setPageContent((current) => {
                        const hasChanges =
                            current.heroTitle !== content.heroTitle ||
                            current.heroSubtitle !== content.heroSubtitle ||
                            current.heroImage !== content.heroImage ||
                            current.aboutContent !== content.aboutContent;

                        return hasChanges ? content : current;
                    });
                },
                (error) => {
                    console.error('Failed to subscribe to Firestore page content:', error);
                },
            );
        } catch (error) {
            console.error('Error setting up Firestore page content subscription:', error);
        }

        (async () => {
            try {
                const existingContent = await fetchPageContentFromFirestore();

                if (existingContent) {
                    setPageContent(existingContent);
                } else {
                    await savePageContentToFirestore(INITIAL_PAGE_CONTENT);
                    setPageContent(INITIAL_PAGE_CONTENT);
                }
            } catch (error) {
                console.error('Failed to initialize Firestore page content:', error);
            }
        })();

        return () => {
            unsubscribe?.();
        };
    }, []);
    // Sync books with Firestore
    useEffect(() => {
        const unsubscribe = subscribeToBooks(
            (bookList) => {
                if (bookList.length > 0) {
                    setBooks(bookList.map((book) => normalizeBook(book)));
                    return;
                }

                if (!hasSeededRef.current) {
                    setBooks((currentBooks) => (currentBooks.length > 0 ? currentBooks : initialBooks));
                } else {
                    setBooks((currentBooks) => (currentBooks.length > 0 ? currentBooks : []));
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
                             } else {
                    setBooks(existingBooks.map((book) => normalizeBook(book)));       
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
        useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        try {
            unsubscribe = subscribeToPageContent(
                (content) => {
                    if (content) {
                        setPageContent(content);
                    }
                },
                (error) => {
                    console.error('Failed to subscribe to Firestore page content:', error);
                },
            );
        } catch (error) {
            console.error('Failed to initialize Firestore page content subscription:', error);
        }

        (async () => {
            try {
                const firestoreContent = await fetchPageContentFromFirestore();
                if (firestoreContent) {
                    setPageContent(firestoreContent);
                }
            } catch (error) {
                console.error('Failed to fetch page content from Firestore:', error);
            }
        })();

        return () => {
            unsubscribe?.();
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
        const normalizedInput = {
            ...book,
            price: Number(book.price),
            stock: Number(book.stock),
        };

        try {
            const newBookId = await addBookToFirestore(normalizedInput);
            const normalizedBook = normalizeBook({ ...normalizedInput, id: newBookId } as Book);
            setBooks((prevBooks) => {
                const nextBooks = [...prevBooks.filter((item) => item.id !== normalizedBook.id), normalizedBook];
                return nextBooks.sort((a, b) => a.title.localeCompare(b.title));
            });
        } catch (error) {
            console.error('Failed to add book to Firestore, falling back to local storage:', error);
            const fallbackId = `local_${Date.now()}`;
            const normalizedBook = normalizeBook({ ...normalizedInput, id: fallbackId } as Book);
            setBooks((prevBooks) => {
                const nextBooks = [...prevBooks, normalizedBook];
                return nextBooks.sort((a, b) => a.title.localeCompare(b.title));
            });
        }
    };
    
    const updateBook = async (updatedBook: Book) => {
        const normalizedBook = normalizeBook({
            ...updatedBook,
            price: Number(updatedBook.price),
            stock: Number(updatedBook.stock),
        });
                setBooks((prevBooks) => {
            const nextBooks = prevBooks.map((book) => (book.id === normalizedBook.id ? normalizedBook : book));
            return nextBooks.sort((a, b) => a.title.localeCompare(b.title));
        });

        try {
            await updateBookInFirestore({
                ...normalizedBook,
            });
        } catch (error) {
            console.error('Failed to update book in Firestore, changes kept locally:', error);
        }
    };

    const deleteBook = async (bookId: string | number) => {
        const id = String(bookId);

        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

        try {
            await deleteBookFromFirestore(bookId);
        } catch (error) {
            console.error('Failed to delete book from Firestore, keeping local list updated:', error);
        }
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
    const updatePageContent = async (newContent: PageContent) => {
        const normalizedContent: PageContent = {
            heroTitle: newContent.heroTitle ?? '',
            heroSubtitle: newContent.heroSubtitle ?? '',
            heroImage: newContent.heroImage ?? '',
            aboutContent: newContent.aboutContent ?? '',
        };

        setPageContent((prevContent) => {
            previousPageContentRef.current = prevContent;
            return normalizedContent;
        });

        try {
            await savePageContentToFirestore(normalizedContent);
        } catch (error) {
            console.error('Failed to save page content to Firestore, reverting to previous content:', error);
            setPageContent(previousPageContentRef.current ?? INITIAL_PAGE_CONTENT);
            throw error;
        } finally {
            previousPageContentRef.current = null;
        }
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
