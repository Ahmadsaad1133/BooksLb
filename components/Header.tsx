import React from 'react';
import { BookOpenIcon, ShoppingCartIcon, UserIcon, ClipboardListIcon } from './Icons';

interface HeaderProps {
    onHomeClick: () => void;
    onBooksClick: () => void;
    onAboutClick: () => void;
    onContactClick: () => void;
    onCartClick: () => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onAdminClick: () => void;
    cartCount: number;
    isOwnerLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
    onHomeClick, onBooksClick, onAboutClick, onContactClick,
    onCartClick, onLoginClick, onLogoutClick, onAdminClick,
    cartCount, isOwnerLoggedIn 
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <BookOpenIcon className="h-8 w-8 text-teal-600" />
          <h1 className="text-2xl font-bold text-stone-800 font-serif">Pop up Books lb</h1>
        </div>
        <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={onHomeClick} className="text-stone-600 hover:text-teal-600 transition duration-300 font-medium">Home</button>
              <button onClick={onBooksClick} className="text-stone-600 hover:text-teal-600 transition duration-300 font-medium">Books</button>
              <button onClick={onAboutClick} className="text-stone-600 hover:text-teal-600 transition duration-300 font-medium">About</button>
              <button onClick={onContactClick} className="text-stone-600 hover:text-teal-600 transition duration-300 font-medium">Contact</button>
            </nav>
            <div className="flex items-center space-x-4 border-l pl-6">
                <button onClick={onCartClick} className="relative text-stone-600 hover:text-teal-600 transition duration-300">
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
                {isOwnerLoggedIn ? (
                    <>
                        <button onClick={onAdminClick} title="Admin Dashboard" className="text-stone-600 hover:text-teal-600 transition duration-300">
                           <ClipboardListIcon className="h-6 w-6" />
                        </button>
                        <button onClick={onLogoutClick} className="text-stone-600 hover:text-red-600 transition duration-300 text-sm font-medium">
                           Logout
                        </button>
                    </>
                ) : (
                    <button onClick={onLoginClick} title="Owner Sign In" className="text-stone-600 hover:text-teal-600 transition duration-300">
                        <UserIcon className="h-6 w-6" />
                    </button>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
