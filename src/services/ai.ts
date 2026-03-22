import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AnalysisResult {
  tone: string;
  energy_score: number;
  bias_rating: string;
  keywords: string[];
  summary: string;
  editorial_note: string;
}

export async function analyzeHeadline(headline: string): Promise<AnalysisResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following news headline or excerpt. Provide an editorial breakdown including tone, emotional energy score (0-100), bias rating (e.g., "Left", "Center-Left", "Center", "Center-Right", "Right", or "Neutral"), keywords, a brief summary, and an editorial note on factual density and framing.\n\nHeadline/Excerpt: "${headline}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tone: {
            type: Type.STRING,
            description: "The overall tone of the text (e.g., Sensational, Objective, Urgent, Somber).",
          },
          energy_score: {
            type: Type.NUMBER,
            description: "Emotional energy score from 0 to 100.",
          },
          bias_rating: {
            type: Type.STRING,
            description: "Bias rating (e.g., Left, Center-Left, Center, Center-Right, Right, Neutral).",
          },
          keywords: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "Key entities or themes mentioned.",
          },
          summary: {
            type: Type.STRING,
            description: "A brief 1-2 sentence summary of the core message.",
          },
          editorial_note: {
            type: Type.STRING,
            description: "An editorial note analyzing the factual density, framing, and potential impact of the headline.",
          },
        },
        required: ["tone", "energy_score", "bias_rating", "keywords", "summary", "editorial_note"],
      },
      systemInstruction: "You are an expert editorial analyst and media critic. Provide objective, insightful analysis of news headlines.",
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to generate analysis.");
  }

  return JSON.parse(text) as AnalysisResult;
}
