export const OWNER_PASSWORD = 'admin';

export const INITIAL_BOOKS = [
    {
        id: 1,
        title: "Dulce de Leche Cheesecake",
        author: "Silky vanilla cheesecake ribboned with golden caramel",
        description: "Our signature cheesecake is baked low and slow on a buttered biscuit crust, then finished with decadent dulce de leche swirls and flakes of sea salt for the perfect balance of sweet and creamy.",
        price: 28.00,
        coverImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
        genre: "Cheesecakes",
        publisher: "Contains dairy, eggs, gluten",
        stock: 24
    },
    {
        id: 2,
        title: "Guava Tres Leches",
        author: "Classic sponge soaked in guava-infused milks",
        description: "A fluffy vanilla sponge cake drenched in a tropical trio of milks and layered with guava compote, topped with cloud-like chantilly and fresh fruit ribbons.",
        price: 22.50,
        coverImage: "https://images.unsplash.com/photo-1513267048331-5611cad62e44?auto=format&fit=crop&w=900&q=80",
        genre: "Signature Cakes",
        publisher: "Contains dairy, eggs, gluten",
        stock: 18
    },
    {
        id: 3,
        title: "Passionfruit Tartlets",
        author: "Crisp pâte sucrée filled with bright tropical curd",
        description: "Mini tart shells baked to a golden snap are filled with velvety passionfruit curd and finished with torched meringue peaks for a tangy-sweet bite.",
        price: 16.00,
        coverImage: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80",
        genre: "Petite Treats",
        publisher: "Contains dairy, eggs, gluten",
        stock: 36
    },
    {
        id: 4,
        title: "Chocolate Hazelnut Profiteroles",
        author: "Choux puffs filled with praline diplomat cream",
        description: "Airy pâte à choux shells are piped full of hazelnut praline pastry cream, dipped in glossy dark chocolate, and sprinkled with roasted nuts for crunch.",
        price: 19.75,
        coverImage: "https://images.unsplash.com/photo-1606117339379-cc5b04f27d5e?auto=format&fit=crop&w=900&q=80",
        genre: "Indulgent Classics",
        publisher: "Contains dairy, eggs, gluten, nuts",
        stock: 32
    },
    {
        id: 5,
        title: "Mango Coconut Verrine",
        author: "Layered mousse with tropical fruit gelée",
        description: "A glassed dessert of coconut panna cotta, mango passionfruit gelée, and airy coconut mousse finished with candied lime zest and toasted coconut flakes.",
        price: 14.50,
        coverImage: "https://images.unsplash.com/photo-1542444459-db68bbf40b25?auto=format&fit=crop&w=900&q=80",
        genre: "Chilled Desserts",
        publisher: "Contains dairy",
        stock: 40
    },
    {
        id: 6,
        title: "Alfajor Cookie Box",
        author: "Shortbread sandwiches with dulce de leche centers",
        description: "Tender cornstarch cookies dusted in powdered sugar and filled with dulce de leche. Packed by the dozen for the perfect sharing box or afternoon treat.",
        price: 18.00,
        coverImage: "https://images.unsplash.com/photo-1618838066472-48c11d07489d?auto=format&fit=crop&w=900&q=80",
        genre: "Giftable Sweets",
        publisher: "Contains dairy, eggs",
        stock: 50
    }
];

export const INITIAL_COLLECTIONS = [
    {
        id: 1,
        name: "Chef's Favorites",
        bookIds: [1, 2, 4, 5]
    },
    {
        id: 2,
        name: "Party-Ready Boxes",
        bookIds: [3, 6]
    }
];

export const INITIAL_PAGE_CONTENT = {
    heroTitle: "Handcrafted Desserts, Delivered with Love",
    heroSubtitle: "Welcome to Deli Postres, your online pastry boutique for Latin-inspired sweets, celebration cakes, and petite indulgences made fresh to order.",
    heroImage: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1887&q=80",
    aboutContent: "Founded in 2023, Deli Postres celebrates the art of modern Latin pastry. From creamy tres leches to jewel-like tartlets, every dessert is crafted in small batches using seasonal ingredients and family recipes. Whether you are planning a party or treating yourself, we are here to sweeten every moment with a touch of warmth and nostalgia."
};
