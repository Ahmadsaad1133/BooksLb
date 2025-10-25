import React from 'react';
import { TrashIcon } from './Icons';
const CartView = ({ cartItems, cartTotal, onUpdateQuantity, onRemoveItem, onCheckout, onContinueShopping }) => {
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold font-serif text-rose-700 mb-4">Your Dessert Box is Empty</h2>
        <p className="text-rose-700/80 mb-8">Looks like you haven't added any sweets yet. Let's pick something delicious!</p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Browse Desserts
        </button>
      </div>
    );
  }

  return (
    <div className="bg-rose-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold font-serif mb-8 text-center text-rose-700">Your Sweet Selections</h2>
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-rose-100">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-rose-100">
              <div className="flex items-center mb-4 sm:mb-0">
                <img src={item.coverImage} alt={item.title} className="w-20 h-28 object-cover rounded-md mr-6" />
                <div>
                  <h3 className="text-lg font-bold font-serif text-rose-700">{item.title}</h3>
                  <p className="text-rose-600 text-sm">{item.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                 <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                    className="w-16 text-center border border-rose-200 rounded-md py-1"
                  />
                <p className="font-bold w-24 text-right text-rose-700">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => onRemoveItem(item.id)} className="text-rose-400 hover:text-rose-600">
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
            <div className="mt-8 text-right">
            <h3 className="text-2xl font-bold text-rose-700">Total: <span className="text-rose-500">${cartTotal.toFixed(2)}</span></h3>
            <p className="text-rose-700/80 text-sm">Delivery details will be confirmed at checkout.</p>
            <button
              onClick={onCheckout}
              className="mt-6 px-10 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
