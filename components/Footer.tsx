import React from 'react';
import { BookOpenIcon } from './Icons.jsx';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-white mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
                <BookOpenIcon className="h-7 w-7 text-teal-400" />
                <h2 className="text-xl font-bold font-serif">Pop up Books lb</h2>
            </div>
            <p className="text-stone-400 text-center max-w-md">
                Discover your next adventure, one page at a time. Your cozy corner for captivating stories.
            </p>
          <p className="text-stone-500 text-sm mt-8">
            &copy; {new Date().getFullYear()} Pop up Books lb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
