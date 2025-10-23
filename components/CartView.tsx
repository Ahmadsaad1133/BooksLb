import React from 'react';
import { TrashIcon } from './Icons.jsx';

const CartView = ({ cartItems, cartTotal, onUpdateQuantity, onRemoveItem, onCheckout, onContinueShopping }) => {
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold font-serif mb-4">Your Cart is Empty</h2>
        <p className="text-stone-600 mb-8">Looks like you haven't added any books yet. Let's find your next read!</p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold font-serif mb-8 text-center">Your Shopping Cart</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-4 border-b">
              <div className="flex items-center mb-4 sm:mb-0">
                <img src={item.coverImage} alt={item.title} className="w-20 h-28 object-cover rounded-md mr-6" />
                <div>
                  <h3 className="text-lg font-bold font-serif">{item.title}</h3>
                  <p className="text-stone-600 text-sm">{item.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                 <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                    className="w-16 text-center border rounded-md py-1"
                  />
                <p className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => onRemoveItem(item.id)} className="text-stone-500 hover:text-red-600">
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 text-right">
            <h3 className="text-2xl font-bold">Total: <span className="text-teal-600">${cartTotal.toFixed(2)}</span></h3>
            <p className="text-stone-500 text-sm">Shipping will be calculated at checkout.</p>
            <button
              onClick={onCheckout}
              className="mt-6 px-10 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
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
