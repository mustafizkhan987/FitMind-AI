"use client";

import { Moon, Sun, Activity, Star } from "lucide-react";

export default function SleepPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Sleep Analysis</h1>
          <p className="text-zinc-400">Monitor your sleep quality and recovery.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
            <h2 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Last Night's Sleep</h2>
            <div className="relative inline-flex items-center justify-center mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#27272a" strokeWidth="8" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#818cf8" strokeWidth="8" strokeDasharray="351" strokeDashoffset="50" />
              </svg>
              <div className="absolute text-3xl font-bold text-white">85</div>
            </div>
            <p className="text-lg font-semibold text-indigo-400">Good Quality</p>
            <p className="text-sm text-zinc-500 mt-2">6 hrs 45 mins total</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Sleep Stages</h3>
            <div className="space-y-4">
              <StageBar label="Deep" time="1h 20m" percent="20%" color="bg-indigo-600" />
              <StageBar label="Light" time="4h 10m" percent="60%" color="bg-indigo-400" />
              <StageBar label="REM" time="1h 15m" percent="15%" color="bg-purple-400" />
              <StageBar label="Awake" time="15m" percent="5%" color="bg-zinc-600" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-[300px] flex flex-col justify-center items-center border-dashed border-2">
             <Moon className="w-10 h-10 text-zinc-700 mb-2" />
             <p className="text-zinc-500">Weekly Sleep Trend Chart Placeholder</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-zinc-950 text-indigo-400 border border-zinc-800">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Wake Up Consistency</h4>
                <p className="text-sm text-zinc-400">You've been waking up around 6:30 AM for the past 5 days. Keep it up!</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-zinc-950 text-yellow-400 border border-zinc-800">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Recovery Recommendation</h4>
                <p className="text-sm text-zinc-400">Your deep sleep was a bit low. Try avoiding screens 1 hour before bed tonight.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageBar({ label, time, percent, color }: any) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-zinc-400 w-12">{label}</span>
      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: percent }}></div>
      </div>
      <span className="text-sm text-zinc-300 w-14 text-right">{time}</span>
    </div>
  );
}
