import { GoogleGenAI, Type } from "@google/genai";
import { DailyTopic } from "../types";

// Initialize Gemini AI
// NOTE: In a real production app, API keys should be handled via backend proxy or strict environment variables.
// We assume process.env.API_KEY is available as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailyCatTopic = async (): Promise<DailyTopic> => {
  try {
    const model = 'gemini-3-flash-preview'; // Updated to valid model name
    
    const response = await ai.models.generateContent({
      model: model,
      contents: "Generate a warm, cozy, and engaging question for a community of cat lovers to discuss today. It should be short, sweet, and encourage photo sharing. Return JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "The main question, e.g., 'Did your cat steal your water?'" },
            description: { type: Type.STRING, description: "A short, warm sub-sentence context." }
          },
          required: ["question", "description"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DailyTopic;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Failed to fetch daily topic:", error);
    // Fallback topic if API fails or key is missing
    return {
      question: "What's your cat's favorite sleeping spot?",
      description: "Share a photo of the coziest nap!"
    };
  }
};