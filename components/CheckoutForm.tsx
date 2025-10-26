import React, { useState } from 'react';

const CheckoutForm = ({ cartItems, cartTotal, onPlaceOrder }) => {
  const [customer, setCustomer] = useState({ name: '', email: '', address: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(customer);
  };

  return (
    <div className="bg-rose-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold font-serif mb-8 text-center text-rose-700">Checkout</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-rose-100">
            <h3 className="text-2xl font-bold font-serif mb-6 text-rose-700">Reader Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-rose-700 font-medium mb-2">Full Name</label>
                <input type="text" id="name" name="name" value={customer.name} onChange={handleChange} required className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none" />
              </div>
              <div className="mb-4">
               <label htmlFor="email" className="block text-rose-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={customer.email} onChange={handleChange} required className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none" />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-rose-700 font-medium mb-2">Mailing Address (optional)</label>
                <input type="text" id="address" name="address" value={customer.address} onChange={handleChange} className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none" />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-rose-700 font-medium mb-2">Phone Number (optional)</label>
                <input type="tel" id="phone" name="phone" value={customer.phone} onChange={handleChange} className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none" />
              </div>
              <h3 className="text-xl font-bold font-serif mt-8 mb-4 text-rose-700">Payment Method</h3>
              <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
                <p className="font-semibold text-rose-700">Digital Delivery</p>
                <p className="text-sm text-rose-700/80">We will email you official Project Gutenberg download links. No payment is required for these public domain ebooks.</p>
              </div>
               <button type="submit" className="w-full mt-8 px-10 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg">
                Complete Request
              </button>
            </form>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg h-fit border border-rose-100">
            <h3 className="text-2xl font-bold font-serif mb-6 text-rose-700">Book Summary</h3>
            {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                        <p className="font-semibold text-rose-700">{item.title} <span className="text-rose-500">x {item.quantity}</span></p>
                    </div>
                    <p className="font-medium text-rose-700">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
            <div className="flex justify-between font-bold text-xl mt-6">
                <p className="text-rose-700">Total</p>
                <p className="text-rose-600">${cartTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
