import React, { useState } from 'react';
import { toBase64 } from '../utils/imageUtils';

const AdminPageContent = ({ bookstore }) => {
  const { pageContent, updatePageContent } = bookstore;
  const [content, setContent] = useState(pageContent);
  const [heroImagePreview, setHeroImagePreview] = useState(pageContent.heroImage);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await toBase64(file);
      setContent(prev => ({ ...prev, heroImage: base64 }));
      setHeroImagePreview(base64);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    updatePageContent(content);
    setTimeout(() => {
        setIsSaving(false)
        alert('Content updated successfully!')
    }, 1000); // Simulate save
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-serif mb-4">Manage Page Content</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="heroTitle" className="block text-stone-700 font-medium mb-1">Hero Title</label>
          <input
            type="text"
            id="heroTitle"
            name="heroTitle"
            value={content.heroTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="heroSubtitle" className="block text-stone-700 font-medium mb-1">Hero Subtitle</label>
          <input
            type="text"
            id="heroSubtitle"
            name="heroSubtitle"
            value={content.heroSubtitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-stone-700 font-medium mb-1">Hero Image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
          {heroImagePreview && <img src={heroImagePreview} alt="Hero preview" className="mt-4 h-48 w-auto object-contain rounded-md bg-stone-100"/>}
        </div>
        <div>
          <label htmlFor="aboutContent" className="block text-stone-700 font-medium mb-1">About Us Content</label>
          <textarea
            id="aboutContent"
            name="aboutContent"
            value={content.aboutContent}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border border-stone-300 rounded-md"
          />
        </div>
        <div className="text-right">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 disabled:bg-stone-400"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPageContent;
