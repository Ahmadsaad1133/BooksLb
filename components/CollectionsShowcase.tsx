import React from 'react';

interface Collection {
    id: string | number;
    name: string;
    bookIds?: Array<string | number>;
}

interface CollectionsShowcaseProps {
    collections: Collection[];
    books: Array<{ id: string | number; title: string; coverImage: string; genre?: string }>;
    onExploreCollection?: (collection: Collection) => void;
}

const CollectionsShowcase: React.FC<CollectionsShowcaseProps> = ({ collections, books, onExploreCollection }) => {
    if (!collections || collections.length === 0) {
        return null;
    }

    const resolvePreviewBook = (collection: Collection) => {
        const [firstId] = collection.bookIds ?? [];
        if (!firstId) {
            return undefined;
        }
        const normalizedId = String(firstId);
        return books.find((book) => String(book.id) === normalizedId);
    };

    return (
        <section className="bg-rose-100/60 py-14">
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-rose-500 font-semibold">Curated Collections</p>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-800">Explore Books by Collection</h2>
                        <p className="mt-2 text-rose-600 max-w-2xl">
                            Browse librarian-picked groupings to discover public domain works organized by theme, genre, or author.
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection) => {
                        const previewBook = resolvePreviewBook(collection);
                        const backgroundImage = previewBook?.coverImage;
                        const previewGenre = previewBook?.genre;
                        const previewTitle = previewBook?.title;

                        return (
                            <article
                                key={collection.id}
                                className="group relative overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
                            >
                                {backgroundImage ? (
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={backgroundImage}
                                            alt={previewTitle ?? collection.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-40 items-center justify-center bg-rose-200/40">
                                        <span className="text-sm font-semibold uppercase tracking-wide text-rose-500">Curated Selection</span>
                                    </div>
                                )}
                                <div className="flex flex-col gap-3 p-6">
                                    <div>
                                        <h3 className="text-xl font-serif font-semibold text-rose-800">{collection.name}</h3>
                                        <p className="text-sm text-rose-600">{collection.bookIds?.length ?? 0} books included</p>
                                    </div>
                                    {previewGenre && (
                                        <span className="inline-flex w-max items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-600">
                                            {previewGenre}
                                        </span>
                                    )}
                                    {previewTitle && (
                                        <p className="text-sm text-rose-500">Featuring <span className="font-medium text-rose-700">{previewTitle}</span></p>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => onExploreCollection?.(collection)}
                                        className="mt-2 inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                                    >
                                        View Books
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CollectionsShowcase;