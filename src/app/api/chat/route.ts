import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are FitMind AI, an elite personal fitness coach, nutritionist, and health companion.
Your goal is to help the user achieve their fitness goals by providing actionable, scientifically-backed, and personalized advice.
You should be motivating, empathetic, and extremely knowledgeable about workouts, diet, hydration, and sleep.
Keep your responses concise, punchy, and formatted with markdown for readability (bullet points, bold text).
Never give dangerous medical advice. If asked about serious medical conditions, recommend consulting a doctor.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Format the history for the Gemini API
    const formattedHistory = history?.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    })) || [];

    // Add system prompt context if it's the first message (or we can use systemInstruction if the model supports it)
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    // We can't directly load history into ai.chats.create in this exact syntax without looping or using a different method if the SDK doesn't support it directly in create().
    // Let's manually manage the history by sending the whole conversation string or using the generateContent endpoint if chat is tricky.
    // Actually, the new SDK `ai.chats.create` handles history via `history` option? Wait, the new SDK uses:
    // const chat = ai.chats.create({ model: "gemini-2.5-flash", history: formattedHistory, config: { systemInstruction: ... } });
    
    // Let's use standard generateContent with a compiled history for simplicity and reliability.
    let fullPrompt = `${SYSTEM_PROMPT}\n\nHere is the conversation history:\n`;
    for (const msg of history || []) {
       fullPrompt += `${msg.role === 'user' ? 'User' : 'FitMind AI'}: ${msg.text}\n`;
    }
    fullPrompt += `User: ${message}\nFitMind AI:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        temperature: 0.7,
      }
    });

    return NextResponse.json({ 
      text: response.text,
      role: "ai"
    });

  } catch (error: any) {
    console.error("AI Coach Error:", error);
    return NextResponse.json(
      { error: "Failed to communicate with AI Coach" },
      { status: 500 }
    );
  }
}
