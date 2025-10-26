import React from 'react';

const OrderConfirmation = ({ lastOrder, onBackToStore }) => {
  if (!lastOrder) {
    return (
        <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-4xl font-bold font-serif text-rose-700 mb-4">No order found.</h2>
            <button
            onClick={onBackToStore}
            className="mt-6 px-10 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
            Back to Store
            </button>
        </div>
    )
  }

  return (
    <div className="bg-rose-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-center border border-rose-100">
          <h2 className="text-4xl font-bold font-serif mb-4 text-rose-600">Your ebooks are on their way!</h2>
          <p className="text-rose-700/80 mb-6">We will email you links to the Project Gutenberg editions included below. Feel free to start another search anytime.</p>
          <div className="text-left bg-rose-50 p-6 rounded-md border border-rose-100 my-8">
            <h3 className="text-xl font-bold font-serif mb-4 text-rose-700">Order Summary (ID: {lastOrder.id})</h3>
            <div className="mb-4 space-y-1 text-rose-700">
              <p><strong>Name:</strong> {lastOrder.customer.name}</p>
              {lastOrder.customer.email && <p><strong>Email:</strong> {lastOrder.customer.email}</p>}
              {lastOrder.customer.address && <p><strong>Mailing Address:</strong> {lastOrder.customer.address}</p>}
            </div>
            {lastOrder.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                     <p className="text-rose-700">{item.title} <span className="text-rose-500">x {item.quantity}</span></p>
                     <p className="font-medium text-rose-700">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-4">
                <p className="text-rose-700">Total</p>
                <p className="text-rose-600">${lastOrder.total.toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={onBackToStore}
            className="mt-6 px-10 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
