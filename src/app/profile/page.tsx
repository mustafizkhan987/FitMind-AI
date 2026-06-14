/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { User, Settings, Award, Shield, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-8">Profile</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 absolute top-0 w-full"></div>
        <div className="px-8 pt-20 pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center overflow-hidden">
              <User className="w-12 h-12 text-zinc-500" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-white">Local User</h2>
              <p className="text-zinc-400">user@fitmind.ai</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">Level 5 Pro</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Personal Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoField label="Height" value="180 cm" />
              <InfoField label="Weight" value="75 kg" />
              <InfoField label="Age" value="28" />
              <InfoField label="Goal" value="Build Muscle" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <MenuButton icon={<Settings />} label="Settings" />
          <MenuButton icon={<Shield />} label="Privacy & Security" />
          <button className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl p-4 flex items-center gap-3 transition-colors text-left">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: any) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg">
      <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block mb-1">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

function MenuButton({ icon, label }: any) {
  return (
    <button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl p-4 flex items-center gap-3 transition-colors text-left">
      <div className="text-zinc-400">{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );
}
