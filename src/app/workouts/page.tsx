"use client";

import { Activity, Plus, Dumbbell, Timer, Flame } from "lucide-react";

export default function WorkoutsPage() {
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
          <Dumbbell className="w-8 h-8 text-emerald-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">12</h3>
          <p className="text-sm text-zinc-400">Workouts this week</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
          <Timer className="w-8 h-8 text-blue-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">4.5h</h3>
          <p className="text-sm text-zinc-400">Total time</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
          <Flame className="w-8 h-8 text-orange-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">3,200</h3>
          <p className="text-sm text-zinc-400">Calories burned</p>
        </div>
      </div>

      {/* Recent Workouts List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Recent Workouts</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {[
            { name: "Upper Body Strength", date: "Today", time: "45 min", type: "Strength" },
            { name: "Morning Run", date: "Yesterday", time: "30 min", type: "Cardio" },
            { name: "HIIT Circuit", date: "2 Days Ago", time: "25 min", type: "HIIT" },
          ].map((workout, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-950/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{workout.name}</h4>
                  <p className="text-xs text-zinc-500">{workout.date} • {workout.time}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-full">
                {workout.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
