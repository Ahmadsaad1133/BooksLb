import React from 'react';
import { CupcakeIcon, ShoppingCartIcon, UserIcon, ClipboardListIcon } from './Icons';
const Header = ({ 
    onHomeClick, onBooksClick, onAboutClick, onContactClick,
    onCartClick, onLoginClick, onLogoutClick, onAdminClick,
    cartCount, isOwnerLoggedIn 
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-rose-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <CupcakeIcon className="h-9 w-9 text-rose-500" />
          <h1 className="text-2xl font-bold text-rose-700 font-serif tracking-wide">Deli Postres</h1>
        </div>
        <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={onHomeClick} className="text-rose-700 hover:text-rose-500 transition duration-300 font-medium">Home</button>
              <button onClick={onBooksClick} className="text-rose-700 hover:text-rose-500 transition duration-300 font-medium">Menu</button>
              <button onClick={onAboutClick} className="text-rose-700 hover:text-rose-500 transition duration-300 font-medium">Our Story</button>
              <button onClick={onContactClick} className="text-rose-700 hover:text-rose-500 transition duration-300 font-medium">Contact</button>
            </nav>
            <div className="flex items-center space-x-4 border-l border-rose-100 pl-6">
                <button onClick={onCartClick} className="relative text-rose-600 hover:text-rose-500 transition duration-300">
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
                {isOwnerLoggedIn ? (
                    <>
                        <button onClick={onAdminClick} title="Admin Dashboard" className="text-rose-600 hover:text-rose-500 transition duration-300">
                           <ClipboardListIcon className="h-6 w-6" />
                        </button>
                        <button onClick={onLogoutClick} className="text-rose-600 hover:text-rose-400 transition duration-300 text-sm font-medium">
                           Log out
                        </button>
                    </>
                ) : (
                    <button onClick={onLoginClick} title="Owner Sign In" className="text-rose-600 hover:text-rose-500 transition duration-300">
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
