export interface Book {
    id: string | number;
    title: string;
    author: string;
    description: string;
    price: number;
    coverImage: string;
    genre: string;
    publisher: string;
    stock: number;
}

export type BookInput = Omit<Book, 'id'>;

export interface PageContent {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    aboutContent: string;
    logoImage: string;
}