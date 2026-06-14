"use client";

import { Activity, Flame, Droplets, Moon, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  return (
    <motion.div 
      className="max-w-6xl mx-auto space-y-8 pb-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">User</span>
          </h1>
          <p className="text-zinc-400 font-medium">Here's your health summary for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 shadow-inner shadow-white/5 rounded-xl px-5 py-2.5 flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-400">Current Streak: </span>
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" /> 12 Days
            </span>
          </div>
        </div>
      </motion.div>

      {/* Top Stats Cards */}
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Activity"
          value="8,432"
          unit="steps"
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
          trend="+12%"
          trendUp={true}
          glowColor="group-hover:shadow-emerald-500/10"
        />
        <StatCard
          title="Calories Burned"
          value="1,240"
          unit="kcal"
          icon={<Flame className="w-5 h-5 text-orange-400" />}
          trend="+5%"
          trendUp={true}
          glowColor="group-hover:shadow-orange-500/10"
        />
        <StatCard
          title="Hydration"
          value="1.2"
          unit="L / 2.5L"
          icon={<Droplets className="w-5 h-5 text-blue-400" />}
          trend="-10%"
          trendUp={false}
          glowColor="group-hover:shadow-blue-500/10"
        />
        <StatCard
          title="Sleep"
          value="6h 45m"
          unit="last night"
          icon={<Moon className="w-5 h-5 text-indigo-400" />}
          trend="+30m"
          trendUp={true}
          glowColor="group-hover:shadow-indigo-500/10"
        />
      </motion.div>

      <motion.div variants={container} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area placeholder */}
        <motion.div variants={item} className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 h-[400px] flex flex-col relative overflow-hidden group hover:border-zinc-700/50 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            Activity Overview
          </h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800/60 rounded-2xl bg-zinc-950/20 group-hover:border-zinc-700 transition-colors duration-500">
            <p className="text-zinc-500 font-medium">Interactive Chart will render here</p>
          </div>
        </motion.div>

        {/* AI Health Twin Mini-Card */}
        <motion.div variants={item} className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">AI Health Twin</h2>
          </div>
          <p className="text-sm text-zinc-400 mb-8 relative z-10 font-medium">
            Predictive health status based on the last 7 days of behavior.
          </p>

          <div className="space-y-5 relative z-10">
            <div className="bg-zinc-950/50 border border-zinc-800/80 p-5 rounded-2xl backdrop-blur-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-zinc-300">Recovery Score</span>
                <span className="text-base font-bold text-emerald-400">85/100</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
                />
              </div>
            </div>

            <div className="bg-zinc-950/50 border border-zinc-800/80 p-5 rounded-2xl backdrop-blur-sm group-hover:border-emerald-500/20 transition-colors duration-500">
              <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                AI Insight
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                You're trending towards a slight calorie surplus this week. Consider a 15-minute cardio session today to balance it out.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ title, value, unit, icon, trend, trendUp, glowColor }: any) {
  return (
    <motion.div variants={item} className={`group bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 hover:border-zinc-700/80 transition-all duration-500 hover:shadow-xl ${glowColor} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm", 
          trendUp ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        )}>
          {trendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-sm font-semibold text-zinc-400 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
          <span className="text-sm font-semibold text-zinc-500">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
