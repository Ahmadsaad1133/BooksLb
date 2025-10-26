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
    type CollectionReference,
    type DocumentReference,
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

const isFirebaseConfigured = Object.values(firebaseConfig).every(
    (value) => typeof value === 'string' && value.trim().length > 0,
);

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let booksCollection: CollectionReference<DocumentData> | null = null;
let pageContentDocRef: DocumentReference<DocumentData> | null = null;

if (isFirebaseConfigured) {
    firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    firestoreDb = getFirestore(firebaseApp);
    booksCollection = collection(firestoreDb, 'books');
    pageContentDocRef = doc(firestoreDb, 'pageContent', 'home');
} else {
    console.warn(
        'Firebase environment variables are not configured. Falling back to local data only.',
    );
}

export const db = firestoreDb;
const mapSnapshotToBook = (snapshot: QueryDocumentSnapshot<DocumentData>): Book => {
    const data = snapshot.data();
    const rawId = typeof data.id === 'string' ? data.id : '';
    const normalizedId = rawId.trim().length > 0 ? rawId : snapshot.id;
    return {
        id: normalizedId,
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
    logoImage: typeof data.logoImage === 'string' ? data.logoImage : '',
});
export const fetchBooks = async (): Promise<Book[]> => {
    if (!booksCollection) {
        return [];
    }

    const booksQuery = query(booksCollection, orderBy('title', 'asc'));
    const snapshot = await getDocs(booksQuery);
    return snapshot.docs.map(mapSnapshotToBook);
};

export const subscribeToBooks = (
    onBooks: (books: Book[]) => void,
    onError?: (error: Error) => void,
): Unsubscribe => {
    if (!booksCollection) {
        const timeoutId = setTimeout(() => onBooks([]), 0);
        return () => clearTimeout(timeoutId);
    }
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
    if (!pageContentDocRef) {
        return null;
    }

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
    if (!pageContentDocRef) {
        const timeoutId = setTimeout(() => onContent(mapDataToPageContent({})), 0);
        return () => clearTimeout(timeoutId);
    }
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
    if (!pageContentDocRef) {
        return;
    }

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
    if (!booksCollection) {
        return `local_${Date.now()}`;
    }
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
    if (!booksCollection) {
        return;
    }
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
    if (!pageContentDocRef) {
        return;
    }
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
    if (!booksCollection) {
        return;
    }
    const docRef = doc(booksCollection, String(bookId));
    await deleteDoc(docRef);
};

export const seedBook = async (book: Book): Promise<void> => {
    if (!booksCollection) {
        return;
    }
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
