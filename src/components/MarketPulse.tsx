import { useAdminSettings } from "@/lib/admin-settings";
import { Coins, Car, Bell, Moon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarketPulse() {
  const { data: s, isLoading } = useAdminSettings();

  if (isLoading || !s) {
    return <div className="h-11 bg-[#020617] animate-pulse border-b border-white/5 w-full sticky top-0 z-[100]" />;
  }

  return (
    <div className="w-full sticky top-0 z-[100] shadow-2xl">
      {/* Elite Status Bar */}
      <div className="bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 px-6 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
        
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-500 italic">Market Live</span>
          </div>

          <div className="flex items-center gap-6 border-l border-white/5 pl-6">
            {/* Commodity Pricing Node */}
            <div className="flex items-center gap-2 group cursor-default">
              <Coins className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-500 transition-colors duration-300" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Gold 24K: <span className="text-slate-200 font-mono font-black ml-1">KES {Number(s.gold_24k_price || 0).toLocaleString()}</span>
              </span>
              <ArrowUpRight size={10} className="text-emerald-500" />
            </div>

            {/* Traffic Metrics Node */}
            <div className="flex items-center gap-2 group cursor-default">
              <Car className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-500 transition-colors duration-300" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Traffic: <span className={cn(
                  "font-black ml-1",
                  s.market_traffic_status?.toLowerCase().includes('heavy') ? "text-rose-500" : "text-amber-500"
                )}>{s.market_traffic_status}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Global Action Flash Terminal */}
        <div className="flex items-center gap-6 shrink-0 ml-auto group cursor-default">
          {s.is_prayer_time && (
            <div className="flex items-center gap-1.5 bg-amber-500/5 px-3 py-1 rounded-md border border-amber-500/10">
              <Moon className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Prayer Mode</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-wider border-l border-white/5 pl-6 italic max-w-sm">
            <Bell size={12} className="text-amber-500 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
            <span className="truncate max-w-[220px] tracking-wide text-slate-500 font-semibold not-italic">
              {s.market_news_flash || "No recent updates broadcasted"}
            </span>
          </div>
        </div>
      </div>
      
      {/* Sub-strip Accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </div>
  );
}
