import React from 'react';
import { Order } from '../types';

interface OrderConfirmationProps {
  lastOrder: Order;
  onBackToStore: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ lastOrder, onBackToStore }) => {
  if (!lastOrder) {
    return (
        <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-4xl font-bold font-serif mb-4">No order found.</h2>
            <button
            onClick={onBackToStore}
            className="mt-6 px-10 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
            Back to Store
            </button>
        </div>
    )
  }

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-bold font-serif mb-4 text-teal-600">Thank You For Your Order!</h2>
          <p className="text-stone-600 mb-6">Your order has been placed successfully. We'll notify you once it has been shipped.</p>
          <div className="text-left bg-stone-50 p-6 rounded-md border my-8">
            <h3 className="text-xl font-bold font-serif mb-4">Order Summary (ID: {lastOrder.id})</h3>
            <div className="mb-4">
              <p><strong>Name:</strong> {lastOrder.customer.name}</p>
              <p><strong>Address:</strong> {lastOrder.customer.address}</p>
            </div>
            {lastOrder.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                     <p>{item.title} <span className="text-stone-500">x {item.quantity}</span></p>
                     <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-4">
                <p>Total</p>
                <p>${lastOrder.total.toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={onBackToStore}
            className="mt-6 px-10 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
