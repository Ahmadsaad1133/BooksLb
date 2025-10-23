import React, { useState } from 'react';
import { XIcon } from './Icons.jsx';

const LoginModal = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = onLogin(password);
    if (!success) {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-8 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold font-serif mb-6 text-center">Owner Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-stone-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
