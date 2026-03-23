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
  try {
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
              description: "Bias rating (MUST be one of: Far-Left, Left, Center-Left, Center, Neutral, Center-Right, Right, Far-Right). Be highly sensitive to subtle framing.",
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
        systemInstruction: "You are an expert editorial analyst and media critic. Provide objective, insightful analysis of news headlines. Be highly sensitive to subtle framing, loaded language, and ideological signaling. Do not default to 'Neutral' unless the text is purely factual and devoid of any framing. Accurately identify 'Left', 'Center-Left', 'Center-Right', or 'Right' bias when present.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("The editorial board returned an empty response.");
    }

    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    if (error.message?.includes("quota") || error.status === 429) {
      throw new Error("The presses are overheated! We've hit our API quota. Please try again later.");
    }
    if (error.message?.includes("network") || error.message?.includes("fetch")) {
      throw new Error("Lost connection to the wire service. Please check your internet connection.");
    }
    throw new Error(error.message || "An unexpected error occurred in the newsroom.");
  }
}
