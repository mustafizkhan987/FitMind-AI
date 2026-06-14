"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Activity, Utensils, Droplets, Moon, BrainCircuit, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Workouts", href: "/workouts", icon: Activity },
  { name: "Nutrition", href: "/nutrition", icon: Utensils },
  { name: "Hydration", href: "/hydration", icon: Droplets },
  { name: "Sleep", href: "/sleep", icon: Moon },
  { name: "AI Coach", href: "/ai-coach", icon: BrainCircuit },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-zinc-800/50 bg-zinc-950/80 backdrop-blur-2xl flex-shrink-0 hidden md:flex flex-col relative z-20">
      <div className="h-20 flex items-center px-8 border-b border-zinc-800/50">
        <div className="flex items-center gap-3 text-2xl font-extrabold text-white tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <BrainCircuit className="w-6 h-6 text-zinc-950" />
          </div>
          FitMind<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">AI</span>
        </div>
      </div>
      
      <nav className="flex-1 py-8 px-4 space-y-2 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300",
                isActive
                  ? "text-emerald-400"
                  : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              
              {!isActive && (
                <div className="absolute inset-0 bg-zinc-800/0 group-hover:bg-zinc-800/40 rounded-2xl transition-colors duration-300 z-0" />
              )}
              
              <item.icon className={cn("w-5 h-5 relative z-10 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-zinc-800/50 bg-gradient-to-b from-transparent to-zinc-950/80">
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors duration-300 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5">
             <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-emerald-400 font-bold">
               U
             </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Local User</p>
            <p className="text-xs text-emerald-400 font-semibold truncate">Level 5 Pro</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
