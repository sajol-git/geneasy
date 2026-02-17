import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize client (Assuming API_KEY is present in environment)
// Note: In a real production app, ensure safe handling of keys.
// For this demo, we assume the environment injects it.
const getAiClient = () => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateTextContent = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning mock text for demonstration.");
    return `[DEMO MODE - NO API KEY] 
    
Here is a simulated response based on your prompt: "${prompt.substring(0, 50)}..."
    
To see real AI generation, please configure the API_KEY environment variable.`;
  }
  
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
  if (!apiKey) {
    console.warn("No API Key found. Returning mock image for demonstration.");
    // Return a placeholder image
    return "https://placehold.co/1024x1024/050505/00f3ff?text=NexusGen+Demo+Image";
  }

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
      const parts = candidates[0].content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            const mimeType = part.inlineData.mimeType || 'image/png';
            return `data:${mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};