import React, { useState } from 'react';

interface ContactFormState {
    name: string;
    email: string;
    message: string;
    phone: string;
}

const INITIAL_STATE: ContactFormState = {
    name: '',
    email: '',
    message: '',
    phone: '',
};

const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<ContactFormState>(INITIAL_STATE);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormState((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('submitting');
        setError(null);

        try {
            // Placeholder asynchronous submission that could be replaced with a real API call.
            await new Promise((resolve) => setTimeout(resolve, 600));
            setStatus('success');
            setFormState(INITIAL_STATE);
        } catch (submissionError) {
            console.error('Failed to submit contact form', submissionError);
            setStatus('error');
            setError('We could not send your message. Please try again or visit https://www.gutenberg.org/contact for assistance.');
        }
    };

  return (
    <section className="py-16 bg-rose-50">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 font-serif text-rose-700">Get in Touch</h2>
        <p className="text-rose-700/80 mb-8">
            Have a request for a specific public domain title or need help locating a Project Gutenberg record? We are happy to help fellow readers.
        </p>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg text-left border border-rose-100">
            <div className="mb-6">
                <label htmlFor="name" className="block text-rose-700 font-medium mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-rose-700 font-medium mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="phone" className="block text-rose-700 font-medium mb-2">Phone (optional)</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-rose-700 font-medium mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
                />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-8 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-400 transition-transform transform hover:scale-105 duration-300 shadow-lg disabled:cursor-not-allowed disabled:opacity-75"
                >
                    {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
                {status === 'success' && (
                    <p className="mt-4 text-sm font-medium text-emerald-600">Thanks for reaching out! Our librarian team will reply within one business day.</p>
                )}
                {error && (
                    <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
                )}
            </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
