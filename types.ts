
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  genre: string;
  publisher: string;
  stock: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface Collection {
  id: number;
  name: string;
  bookIds: number[];
}

export interface PageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutContent: string;
}
