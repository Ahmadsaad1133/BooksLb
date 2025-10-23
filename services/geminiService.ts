

import { GoogleGenAI, Type } from "@google/genai";
import { Book } from '../types';

interface RecommendedBook {
    title: string;
}

export const getGeminiBookRecommendations = async (
  query: string,
  books: Book[]
): Promise<RecommendedBook[]> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set. Gemini features will not work.");
    throw new Error("AI features are currently unavailable. Please check the configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const bookList = books.map(b => `- "${b.title}" by ${b.author} (Genre: ${b.genre})`).join('\n');
    
    const prompt = `
      You are an expert bookseller at a bookstore called "Pop up Books lb".
      A customer is looking for a book. Their request is: "${query}".

      Here is a list of available books in our inventory:
      ${bookList}

      Based on the customer's request, please recommend up to 3 books from the list.
      Only recommend books that are on the list.
      If no books from the list match the request, return an empty array.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title of the recommended book.",
              },
            },
            required: ["title"],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
        return [];
    }
    const result = JSON.parse(jsonString);
    return result as RecommendedBook[];

  } catch (error) {
    console.error("Error getting book recommendations from Gemini:", error);
    throw new Error("Failed to get recommendations. Please try again.");
  }
};