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
    const bookList = books.map(b => `- "${b.title}" | Flavor notes: ${b.author} | Category: ${b.genre}`).join('\n');
    
    const prompt = `
      You are the pastry concierge for an online dessert shop called "Deli Postres".
      A guest has shared the following craving or event details: "${query}".

      Here is a list of desserts currently available:
      ${bookList}
      Suggest up to 3 desserts from this list that best match the guest's request.
      Only recommend desserts that appear in the list.
      If nothing is a good fit, return an empty array.
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
    console.error("Error getting dessert recommendations from Gemini:", error);
    // Check for common API key errors
    if (error.message && error.message.includes('API key not valid')) {
        throw new Error("The provided API Key is not valid. Please check your key and try again.");
    }
    throw new Error("Failed to get dessert recommendations. The AI service may be temporarily unavailable.");
  }
};
