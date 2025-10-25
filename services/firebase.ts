import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
    getFirestore,
    type Firestore,
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    type Unsubscribe,
    type QueryDocumentSnapshot,
    type DocumentData,
} from 'firebase/firestore';

import type { Book, BookInput, PageContent } from '../types';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(firebaseApp);

const booksCollection = collection(db, 'books');
const pageContentDocRef = doc(db, 'pageContent', 'home');
const mapSnapshotToBook = (snapshot: QueryDocumentSnapshot<DocumentData>): Book => {
    const data = snapshot.data();

    return {
        id: data.id ?? snapshot.id,
        title: data.title ?? '',
        author: data.author ?? '',
        description: data.description ?? '',
        price: typeof data.price === 'number' ? data.price : Number(data.price ?? 0),
        coverImage: data.coverImage ?? '',
        genre: data.genre ?? '',
        publisher: data.publisher ?? '',
        stock: typeof data.stock === 'number' ? data.stock : Number(data.stock ?? 0),
    };
};
const mapDataToPageContent = (data: DocumentData): PageContent => ({
    heroTitle: typeof data.heroTitle === 'string' ? data.heroTitle : '',
    heroSubtitle: typeof data.heroSubtitle === 'string' ? data.heroSubtitle : '',
    heroImage: typeof data.heroImage === 'string' ? data.heroImage : '',
    aboutContent: typeof data.aboutContent === 'string' ? data.aboutContent : '',
});
export const fetchBooks = async (): Promise<Book[]> => {
    const booksQuery = query(booksCollection, orderBy('title', 'asc'));
    const snapshot = await getDocs(booksQuery);
    return snapshot.docs.map(mapSnapshotToBook);
};

export const subscribeToBooks = (
    onBooks: (books: Book[]) => void,
    onError?: (error: Error) => void,
): Unsubscribe => {
    const booksQuery = query(booksCollection, orderBy('title', 'asc'));

    return onSnapshot(
        booksQuery,
        (snapshot) => {
            const books = snapshot.docs.map(mapSnapshotToBook);
            onBooks(books);
        },
        (error) => {
            console.error('Error with Firestore book subscription:', error);
            onError?.(error);
        },
    );
};
export const fetchPageContent = async (): Promise<PageContent | null> => {
    const snapshot = await getDoc(pageContentDocRef);

    if (!snapshot.exists()) {
        return null;
    }

    return mapDataToPageContent(snapshot.data() ?? {});
};

export const subscribeToPageContent = (
    onContent: (content: PageContent) => void,
    onError?: (error: Error) => void,
): Unsubscribe => {
    return onSnapshot(
        pageContentDocRef,
        (snapshot) => {
            if (!snapshot.exists()) {
                return;
            }

            const content = mapDataToPageContent(snapshot.data() ?? {});
            onContent(content);
        },
        (error) => {
            console.error('Error with Firestore page content subscription:', error);
            onError?.(error);
        },
    );
};

export const savePageContent = async (content: PageContent): Promise<void> => {
    await setDoc(
        pageContentDocRef,
        {
            ...content,
            updatedAt: serverTimestamp(),
        },
        { merge: true },
    );
};

export const addBook = async (book: BookInput): Promise<string> => {
    const docRef = doc(booksCollection);
    await setDoc(docRef, {
        ...book,
        id: docRef.id,
        price: Number(book.price),
        stock: Number(book.stock),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
};

export const updateBook = async (book: Book): Promise<void> => {
    const { id, ...data } = book;
    const docRef = doc(booksCollection, String(id));
    await updateDoc(docRef, {
        ...data,
        id: String(id),
        price: Number(book.price),
        stock: Number(book.stock),
        updatedAt: serverTimestamp(),
    });
};
export const updatePageContent = async (content: PageContent): Promise<void> => {
    await setDoc(
        pageContentDocRef,
        {
            ...content,
            updatedAt: serverTimestamp(),
        },
        { merge: true },
    );
};
export const deleteBook = async (bookId: string | number): Promise<void> => {
    const docRef = doc(booksCollection, String(bookId));
    await deleteDoc(docRef);
};

export const seedBook = async (book: Book): Promise<void> => {
    const docRef = doc(booksCollection, String(book.id));
    await setDoc(docRef, {
        ...book,
        id: String(book.id),
        price: Number(book.price),
        stock: Number(book.stock),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};
