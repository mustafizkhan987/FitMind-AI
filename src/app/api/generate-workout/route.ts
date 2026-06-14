import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { equipment, time, intensity } = await req.json();

    if (!equipment || !time || !intensity) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a structured, safe, and effective workout plan for someone with the following constraints:
        - Available Equipment: ${equipment}
        - Available Time: ${time} minutes
        - Desired Intensity: ${intensity}
      Make it challenging but realistic.`,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy title for the workout" },
            estimatedCalories: { type: Type.INTEGER, description: "Estimated calories burned" },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  sets: { type: Type.INTEGER },
                  reps: { type: Type.STRING, description: "e.g., '10-12' or '30 seconds'" },
                  notes: { type: Type.STRING, description: "Form cue or tip" }
                }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text() || "{}");
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Workout Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate workout from AI" },
      { status: 500 }
    );
  }
}
