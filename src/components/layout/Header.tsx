import { Bell, Search, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-zinc-400 hover:text-zinc-100">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search FitMind AI..."
            className="w-64 h-9 bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950"></span>
        </button>
      </div>
    </header>
  );
}
