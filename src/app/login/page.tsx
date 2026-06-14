"use client";

import { BrainCircuit, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function LoginPage() {
  const router = useRouter();
  const [nameInput, setNameInput] = useState("");
  const setName = useStore((state) => state.setName);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setName(nameInput.trim());
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[40px] opacity-30 rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <BrainCircuit className="w-10 h-10 text-zinc-950" />
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
          Welcome to FitMind<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">AI</span>
        </h1>
        <p className="text-center text-zinc-400 font-medium mb-8">
          Your offline-first, private AI health twin. All your data stays right here on your device.
        </p>

        <form onSubmit={handleStart} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">What should I call you?</label>
            <input 
              type="text" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={!nameInput.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-zinc-950 font-bold rounded-xl py-3.5 flex items-center justify-center gap-3 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Start Tracking
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
