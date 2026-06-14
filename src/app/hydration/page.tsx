"use client";

import { Droplets, Plus, Minus } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function HydrationPage() {
  const { waterDrank, waterGoal, addWater, removeWater } = useStore();
  
  // Convert glasses to Liters (assuming 1 glass = 0.25L)
  const waterAmount = waterDrank * 0.25;
  const goalLiters = waterGoal * 0.25;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8 flex flex-col items-center mt-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Hydration Tracker</h1>
        <p className="text-zinc-400">Keep your body hydrated to maximize performance and recovery.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-full aspect-square w-80 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl shadow-blue-500/10">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-blue-500/20 transition-all duration-300 ease-in-out -z-10"
          style={{ height: `${Math.min((waterAmount / goalLiters) * 100, 100)}%` }}
        />
        
        <Droplets className="w-12 h-12 text-blue-400 mb-4" />
        <div className="flex items-baseline gap-2 mb-1">
          <h2 className="text-5xl font-bold text-white">{waterAmount.toFixed(2)}</h2>
          <span className="text-xl text-zinc-500">L</span>
        </div>
        <p className="text-sm font-medium text-zinc-400">Daily Goal: {goalLiters}L</p>
      </div>

      <div className="flex items-center gap-6 mt-12">
        <button 
          onClick={removeWater}
          className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
        >
          <Minus className="w-6 h-6" />
        </button>
        <div className="text-center w-32">
          <p className="text-sm font-medium text-zinc-500 mb-1">Quick Log</p>
          <p className="text-lg font-bold text-white">250ml</p>
        </div>
        <button 
          onClick={addWater}
          className="w-16 h-16 rounded-2xl bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors text-white shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
