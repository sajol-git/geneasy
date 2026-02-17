import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize client (Assuming API_KEY is present in environment)
// Note: In a real production app, ensure safe handling of keys.
// For this demo, we assume the environment injects it.
const getAiClient = () => new GoogleGenAI({ apiKey });

export const generateTextContent = async (prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key not found");
  
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No text generated.";
  } catch (error) {
    console.error("Text Gen Error:", error);
    throw error;
  }
};

export const generateImageContent = async (prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key not found");

  try {
    const ai = getAiClient();
    // Using gemini-2.5-flash-image for image generation as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });

    // Iterate through parts to find the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};
