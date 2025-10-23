
import { Book, Collection, PageContent } from './types';

export const OWNER_PASSWORD = 'admin';

export const INITIAL_BOOKS: Book[] = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
        price: 15.99,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91p5b0UvQ6L.jpg",
        genre: "Fantasy",
        publisher: "Viking",
        stock: 50
    },
    {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
        price: 18.50,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91ttJdJifOL.jpg",
        genre: "Sci-Fi",
        publisher: "Ballantine Books",
        stock: 45
    },
    {
        id: 3,
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        description: "A novel that looks at our changing world through the eyes of an unforgettable narrator, and one that explores the fundamental question: what does it mean to love?",
        price: 16.99,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71xLmdLOQ0L.jpg",
        genre: "Sci-Fi",
        publisher: "Knopf",
        stock: 30
    },
    {
        id: 4,
        title: "The Four Winds",
        author: "Kristin Hannah",
        description: "An epic novel of love and heroism and hope, set against the backdrop of one of America’s most defining eras—the Great Depression.",
        price: 17.00,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91fABw02aBL.jpg",
        genre: "Historical Fiction",
        publisher: "St. Martin's Press",
        stock: 60
    },
    {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        description: "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.",
        price: 14.99,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
        genre: "Self-Help",
        publisher: "Avery",
        stock: 100
    },
    {
        id: 6,
        title: "The Vanishing Half",
        author: "Brit Bennett",
        description: "A stunning novel about twin sisters, inseparable as children, who ultimately choose to live in two very different worlds, one black and one white.",
        price: 16.20,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71eO9+DFFbL.jpg",
        genre: "Fiction",
        publisher: "Riverhead Books",
        stock: 40
    }
];

export const INITIAL_COLLECTIONS: Collection[] = [
    {
        id: 1,
        name: "Bestsellers",
        bookIds: [1, 2, 5, 6]
    },
    {
        id: 2,
        name: "Science Fiction Picks",
        bookIds: [2, 3]
    }
];

export const INITIAL_PAGE_CONTENT: PageContent = {
    heroTitle: "Find Your Next Great Read",
    heroSubtitle: "Explore our curated collection of pop-up books and timeless classics. Adventure awaits between the pages.",
    heroImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    aboutContent: "Founded in 2023, Pop up Books lb is a cozy corner for book lovers of all ages. We believe in the magic of stories and the power of a good book to transport you to another world. Our mission is to share our passion for reading by offering a carefully curated selection of books that inspire, entertain, and spark curiosity."
};
