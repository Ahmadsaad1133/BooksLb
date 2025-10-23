import { GoogleGenAI } from "@google/genai";

export const getGeminiBookRecommendations = async (
  query,
  books,
  apiKey
) => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide your Google AI API key to get recommendations.");
  }

  const ai = new GoogleGenAI({ apiKey });

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
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              title: {
                type: 'STRING',
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
    return result;

  } catch (error) {
    console.error("Error getting book recommendations from Gemini:", error);
    // Check for common API key errors
    if (error.message && error.message.includes('API key not valid')) {
        throw new Error("The provided API Key is not valid. Please check your key and try again.");
    }
    throw new Error("Failed to get recommendations. The AI service may be temporarily unavailable.");
  }
};
