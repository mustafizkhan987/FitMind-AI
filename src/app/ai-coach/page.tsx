"use client";

import { BrainCircuit, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export default function AICoachPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! I'm your FitMind AI Coach. I've analyzed your recent workouts and sleep. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMsg.content,
          history: messages.map(m => ({ role: m.role, text: m.content }))
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: "ai", content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
          <BrainCircuit className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Coach</h1>
          <p className="text-sm text-zinc-400">Your personalized health and fitness assistant.</p>
        </div>
      </div>

      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === "user" 
                  ? "bg-emerald-500 text-zinc-950 rounded-br-none" 
                  : "bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700"
              }`}>
                {msg.role === "ai" && <Sparkles className="w-4 h-4 mb-1 text-emerald-400" />}
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-zinc-950 border-t border-zinc-800">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a workout, diet tip, or analysis..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 pl-5 pr-14 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 w-10 h-10 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
