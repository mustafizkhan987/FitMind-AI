"use client";

import { Utensils, Plus, Target, PieChart } from "lucide-react";

export default function NutritionPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Nutrition
          </h1>
          <p className="text-zinc-400">Track your meals, calories, and macros.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Log Meal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Summary */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Daily Summary</h2>
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#27272a" strokeWidth="12" />
                <circle cx="80" cy="80" r="70" fill="none" stroke="#34d399" strokeWidth="12" strokeDasharray="440" strokeDashoffset="150" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-white">1,850</span>
                <span className="text-xs text-zinc-500">/ 2400 kcal</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <MacroBar name="Protein" value="120g" target="150g" percent="80%" color="bg-blue-400" />
            <MacroBar name="Carbs" value="200g" target="250g" percent="80%" color="bg-orange-400" />
            <MacroBar name="Fats" value="45g" target="65g" percent="70%" color="bg-yellow-400" />
          </div>
        </div>

        {/* Meal Logs */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Today's Meals</h2>
          </div>
          <div className="flex-1 divide-y divide-zinc-800">
            {[
              { meal: "Breakfast", items: "Oatmeal, 2 Eggs, Black Coffee", kcal: 450 },
              { meal: "Lunch", items: "Grilled Chicken Salad, Vinaigrette", kcal: 600 },
              { meal: "Dinner", items: "Not logged yet", kcal: 0 },
            ].map((m, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-950/50 transition-colors">
                <div>
                  <h4 className="text-white font-medium">{m.meal}</h4>
                  <p className="text-sm text-zinc-500">{m.items}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white">{m.kcal}</span>
                  <span className="text-xs text-zinc-500 ml-1">kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MacroBar({ name, value, target, percent, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-zinc-300 font-medium">{name}</span>
        <span className="text-zinc-500">{value} <span className="text-zinc-700">/ {target}</span></span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: percent }}></div>
      </div>
    </div>
  );
}
