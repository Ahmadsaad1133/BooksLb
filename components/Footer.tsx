import React from 'react';
import { BookIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="bg-rose-900 text-rose-50 mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
                <BookIcon className="h-7 w-7 text-rose-200" />
                <h2 className="text-xl font-bold font-serif tracking-wide">Public Domain Bookshelf</h2>
            </div>
            <p className="text-rose-200/80 text-center max-w-md">
                Discover authentic public domain literature curated from Project Gutenberg and other trusted archives. Every listing points you to a freely accessible edition.
            </p>
          <p className="text-rose-200/70 text-sm mt-8">
            &copy; {new Date().getFullYear()} Public Domain Bookshelf. Texts courtesy of Project Gutenberg.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
