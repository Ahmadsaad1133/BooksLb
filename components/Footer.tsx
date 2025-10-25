import React from 'react';
import { CupcakeIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="bg-rose-900 text-rose-50 mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
                <CupcakeIcon className="h-7 w-7 text-rose-200" />
                <h2 className="text-xl font-bold font-serif tracking-wide">Deli Postres</h2>
            </div>
            <p className="text-rose-200/80 text-center max-w-md">
                Small-batch sweets inspired by Latin flavors and made to share. Thank you for letting us sweeten your celebrations.
            </p>
          <p className="text-rose-200/70 text-sm mt-8">
            &copy; {new Date().getFullYear()} Deli Postres. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
