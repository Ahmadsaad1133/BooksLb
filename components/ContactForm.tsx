import React, { useState } from 'react';

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd handle form submission here.
        setSubmitted(true);
        alert('Thank you for reaching out to Deli Postres! We\'ll reply with something sweet soon.');
    };

  return (
    <section className="py-16 bg-rose-50">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 font-serif text-rose-700">Let's Chat Sweets</h2>
        <p className="text-rose-700/80 mb-8">
            Planning a celebration or craving something special? Tell us how we can make your day sweeter.
        </p>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg text-left border border-rose-100">
            <div className="mb-6">
                <label htmlFor="name" className="block text-rose-700 font-medium mb-2">Name</label>
                <input type="text" id="name" required className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"/>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-rose-700 font-medium mb-2">Email</label>
                <input type="email" id="email" required className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"/>
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-rose-700 font-medium mb-2">Message</label>
                <textarea id="message" rows={5} required className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"></textarea>
            </div>
            <div className="text-center">
                <button type="submit" className="px-8 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg">
                    Send Message
                </button>
            </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
