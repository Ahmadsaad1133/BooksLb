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
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold font-serif mb-8 text-center">Checkout</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold font-serif mb-6">Shipping Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-stone-700 font-medium mb-2">Full Name</label>
                <input type="text" id="name" name="name" value={customer.name} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-stone-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={customer.email} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-stone-700 font-medium mb-2">Full Address</label>
                <input type="text" id="address" name="address" value={customer.address} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500" />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-stone-700 font-medium mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={customer.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500" />
              </div>
              <h3 className="text-xl font-bold font-serif mt-8 mb-4">Payment Method</h3>
              <div className="bg-stone-100 p-4 rounded-md border border-stone-200">
                <p className="font-semibold">Cash on Delivery</p>
                <p className="text-sm text-stone-600">Pay with cash when your order is delivered.</p>
              </div>
               <button type="submit" className="w-full mt-8 px-10 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg">
                Place Order
              </button>
            </form>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
            <h3 className="text-2xl font-bold font-serif mb-6">Order Summary</h3>
            {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                        <p className="font-semibold">{item.title} <span className="text-stone-500">x {item.quantity}</span></p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
            <div className="flex justify-between font-bold text-xl mt-6">
                <p>Total</p>
                <p className="text-teal-600">${cartTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
