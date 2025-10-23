import React from 'react';

const Hero = ({ title, subtitle, image, onShopNow }) => {
  return (
    <section 
      className="bg-cover bg-center h-[60vh] text-white flex items-center" 
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image})` }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-4 font-serif drop-shadow-lg">{title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">{subtitle}</p>
        <button 
          onClick={onShopNow}
          className="px-8 py-3 bg-teal-600 font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
