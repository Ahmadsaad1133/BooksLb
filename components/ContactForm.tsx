
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd handle form submission here.
        setSubmitted(true);
        alert('Thank you for your message! We will get back to you soon.');
    };

  return (
    <section className="py-16 bg-stone-100">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 font-serif">Get In Touch</h2>
        <p className="text-stone-600 mb-8">
            Have a question, a book suggestion, or just want to say hello? Drop us a line!
        </p>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg text-left">
            <div className="mb-6">
                <label htmlFor="name" className="block text-stone-700 font-medium mb-2">Name</label>
                <input type="text" id="name" required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-stone-700 font-medium mb-2">Email</label>
                <input type="email" id="email" required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-stone-700 font-medium mb-2">Message</label>
                <textarea id="message" rows={5} required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"></textarea>
            </div>
            <div className="text-center">
                <button type="submit" className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg">
                    Send Message
                </button>
            </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
