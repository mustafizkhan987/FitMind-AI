"use client";

import { Activity, Plus, Dumbbell, Timer, Flame, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function WorkoutsPage() {
  const [equipment, setEquipment] = useState("Dumbbells and bench");
  const [time, setTime] = useState("30");
  const [intensity, setIntensity] = useState("High");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);

  const generateWorkout = async () => {
    setIsGenerating(true);
    setGeneratedWorkout(null);
    try {
      const res = await fetch("/api/generate-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equipment, time, intensity })
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data = await res.json();
      setGeneratedWorkout(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate workout. Check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Workouts
          </h1>
          <p className="text-zinc-400">Track and manage your fitness routines.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Log Workout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 flex flex-col items-center justify-center">
          <Dumbbell className="w-8 h-8 text-emerald-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">12</h3>
          <p className="text-sm text-zinc-400">Workouts this week</p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 flex flex-col items-center justify-center">
          <Timer className="w-8 h-8 text-blue-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">4.5h</h3>
          <p className="text-sm text-zinc-400">Total time</p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 flex flex-col items-center justify-center">
          <Flame className="w-8 h-8 text-orange-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">3,200</h3>
          <p className="text-sm text-zinc-400">Calories burned</p>
        </div>
      </div>

      {/* Smart Workout Generator */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/20 rounded-3xl overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="px-6 py-5 border-b border-zinc-800/50 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Smart Workout Generator
          </h2>
        </div>
        <div className="p-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Equipment Available</label>
              <input type="text" value={equipment} onChange={e => setEquipment(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. Dumbbells, Bodyweight" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Time (minutes)</label>
              <input type="number" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. 30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Intensity</label>
              <select value={intensity} onChange={e => setIntensity(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Insane</option>
              </select>
            </div>
          </div>
          <button 
            onClick={generateWorkout}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isGenerating ? "Generating your perfect workout..." : "Generate AI Workout"}
          </button>

          {generatedWorkout && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                <h3 className="text-2xl font-bold text-emerald-400">{generatedWorkout.title}</h3>
                <span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                  <Flame className="w-4 h-4" /> ~{generatedWorkout.estimatedCalories} kcal
                </span>
              </div>
              <div className="space-y-4">
                {generatedWorkout.exercises?.map((ex: any, idx: number) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                    <div>
                      <h4 className="font-bold text-white text-lg">{ex.name}</h4>
                      <p className="text-sm text-zinc-400 mt-1">{ex.notes}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <div className="text-emerald-400 font-bold">{ex.sets} Sets</div>
                      <div className="text-zinc-500 text-sm">{ex.reps}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
