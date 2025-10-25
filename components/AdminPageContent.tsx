import React, { useState, useEffect } from 'react';
import { toBase64 } from '../utils/imageUtils';
import type { PageContent } from '../types';

interface AdminPageContentProps {
  bookstore: {
    pageContent: PageContent;
    updatePageContent: (content: PageContent) => Promise<void>;
  };
}

const AdminPageContent: React.FC<AdminPageContentProps> = ({ bookstore }) => {
  const { pageContent, updatePageContent } = bookstore;
  const [content, setContent] = useState<PageContent>(pageContent);
  const [heroImagePreview, setHeroImagePreview] = useState<string>(pageContent.heroImage);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    setContent(pageContent);
    setHeroImagePreview(pageContent.heroImage);
  }, [pageContent]);
  useEffect(() => {
    setContent(pageContent);
    setHeroImagePreview(pageContent.heroImage);
  }, [pageContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = (await toBase64(file)) as string;
      setContent(prev => ({ ...prev, heroImage: base64 }));
      setHeroImagePreview(base64);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePageContent(content);
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Failed to update page content:', error);
      alert('Failed to update content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-serif mb-4 text-rose-700">Manage Page Content</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="heroTitle" className="block text-rose-700 font-medium mb-1">Hero Title</label>
          <input
            type="text"
            id="heroTitle"
            name="heroTitle"
            value={content.heroTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
        <div>
          <label htmlFor="heroSubtitle" className="block text-rose-700 font-medium mb-1">Hero Subtitle</label>
          <input
            type="text"
            id="heroSubtitle"
            name="heroSubtitle"
            value={content.heroSubtitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
        <div>
          <label className="block text-rose-700 font-medium mb-1">Hero Image</label>
           <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full text-sm text-rose-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-600 hover:file:bg-rose-100"
          />
        </div>
        <div>
          <label htmlFor="aboutContent" className="block text-rose-700 font-medium mb-1">Our Story Content</label>
          <textarea
            id="aboutContent"
            name="aboutContent"
            value={content.aboutContent}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
        <div className="text-right">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-rose-500 text-white font-bold rounded-md hover:bg-rose-400 disabled:bg-rose-200"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPageContent;
