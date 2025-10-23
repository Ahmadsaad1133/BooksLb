import React from 'react';

const AboutSection = ({ content }) => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-4xl font-bold mb-4 font-serif">About Us</h2>
        <p className="text-stone-600 leading-relaxed">
            {content}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
